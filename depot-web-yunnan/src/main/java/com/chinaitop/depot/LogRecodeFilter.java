package com.chinaitop.depot;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.chinaitop.depot.system.feignService.BasicFeignService;
import com.chinaitop.depot.system.feignService.SystemFeignService;
import com.chinaitop.depot.system.mapper.SystemLogMapper;
import com.chinaitop.depot.system.mapper.SystemLogThreeMapper;
import com.chinaitop.depot.system.mapper.SystemLogTwoMapper;
import com.chinaitop.depot.system.model.SystemLog;
import com.chinaitop.depot.system.model.SystemLogExample;
import com.chinaitop.depot.system.model.SystemLogThree;
import com.chinaitop.depot.system.model.SystemLogTwo;
import com.chinaitop.depot.system.service.UserOperationlogService;
import com.chinaitop.depot.system.service.UserOperationtypeService;
import com.chinaitop.depot.utils.RedisUtil;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

/**
 * Create by hf on 2018/11
 * 接口调用日志记录过滤器
 */
@Component
public class LogRecodeFilter extends ZuulFilter {
	
	private static final Logger logger = LoggerFactory.getLogger(LogRecodeFilter.class);
	
	@Resource
    private UserOperationtypeService userOperationtypeService;
	
	@Resource
	private UserOperationlogService userOperationlogService;
	
	private static String system_index = "库级系统";

	@Autowired
	private RedisUtil redisUtil;
	
	@Autowired
	private SystemLogMapper systemLogMapper;
	
	@Autowired
	private SystemLogTwoMapper systemLogTwoMapper;
	
	@Autowired
	private SystemLogThreeMapper systemLogThreeMapper;
	
	@Resource
	private SystemFeignService systemFeignService;

	@Resource
	private BasicFeignService basicFeignService;

	@Override
	public Object run() throws ZuulException {
		try {
            logger.info("进入日志记录过滤器");
            RequestContext ctx = RequestContext.getCurrentContext();
            HttpServletRequest request = ctx.getRequest();
            HttpServletResponse response = ctx.getResponse();

            //记录日志
            saveSystemLog(request, response);
        } catch (Exception e) {
            logger.error("LogRecode IO异常", e);
        }

        return null;
	}

	@Override
	public boolean shouldFilter() {
        return true;
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	@Override
	public String filterType() {
		return "post";//代表会在请求被路由之后执行
	}
	
	/**
	 * 获取IP地址
	 * 
	 * 使用Nginx等反向代理软件， 则不能通过request.getRemoteAddr()获取IP地址
	 * 如果使用了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP地址，X-Forwarded-For中第一个非unknown的有效IP字符串，则为真实IP地址
	 */
	public static String getIpAddr(HttpServletRequest request) {

		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
	}
	
	private void saveSystemLog(HttpServletRequest request, HttpServletResponse response) {
		//获取URL
        String url = request.getRequestURI();
        //获取用户信息和单位信息
        String userJson = ObjectUtils.toString(request.getSession().getAttribute("userInfo"),"");
        String orgInfoJson = ObjectUtils.toString(request.getSession().getAttribute("orgInfo"),"");
        String yzm_code = ObjectUtils.toString(request.getSession().getAttribute("Service_Code"),"");

        //退出日志
    	if ("/depot-system/userInfo/exitLogin".equals(url)
    			&& !"".equals(userJson) && !"".equals(orgInfoJson)
    			&& null != userJson && null != orgInfoJson) {
    		loginOrExitLogger(request, response, url, userJson, orgInfoJson);
    	}
    	//登录日志
    	if ("/depot-system/userInfo/login".equals(url)) {
    		Map<String,String[]> param_map = request.getParameterMap();
    		String yzm = ObjectUtils.toString(param_map.get("yzm")[0], "");
    		if (yzm_code.equals(yzm)) {
    			String username = ObjectUtils.toString(param_map.get("username")[0], "");
    			String password = ObjectUtils.toString(param_map.get("password")[0], "");
    			Map<String, Object> result_map = systemFeignService.getUserData(username, password);
    			String userInfo = ObjectUtils.toString(result_map.get("user"), "");
    			String orgInfo = "";
    			if (null != userInfo && !"".equals(userInfo)) {
    				orgInfo = result_map.get("org").toString();
    				loginOrExitLogger(request, response, url, userInfo, orgInfo);
    			}
    		} else {
    			//验证码不对就不执行了
    		}
    	}
    	//功能操作和访问日志
    	if (!"/depot-system/userInfo/login".equals(url) && !"/depot-system/userInfo/exitLogin".equals(url)
    			&& !"".equals(userJson) && !"".equals(orgInfoJson)
    			&& null != userJson && null != orgInfoJson) {
    		url = url.substring(url.indexOf("/", 1), url.length());
    		operationLogger(request, response, url);
    	}
	}
	
	/**
     * 登录和退出日志
     * @param request
     * @param response
     */
    private void loginOrExitLogger(HttpServletRequest request, HttpServletResponse response, String url, String userJson, String orgInfoJson) {
    	//获取用户信息和单位信息
        //String userJson = ObjectUtils.toString(request.getSession().getAttribute("userInfo"),"");
        //String orgInfoJson = ObjectUtils.toString(request.getSession().getAttribute("orgInfo"),"");
    	//登录
        if ("/depot-system/userInfo/login".equals(url)) {
	    	SystemLog log = new SystemLog();
	    	Map<String, String> user_map = getUserOrgInfo(userJson, orgInfoJson);
			log.setSystemIdentify(system_index);
			log.setUserZh(ObjectUtils.toString(user_map.get("username"),""));//账号
			log.setUserName(ObjectUtils.toString(user_map.get("realName"),""));//名称
			String device_ip = getIpAddr(request);
			log.setDeviceIp(device_ip);
			log.setDlTime(new Date());
			log.setUserRole(ObjectUtils.toString(user_map.get("roleName"),""));//角色
			log.setOrgId(Integer.parseInt(user_map.get("orgId")));//单位
			String enumid = ObjectUtils.toString(user_map.get("areaCode"), "0");
			if (!"0".equals(enumid)) {
				String strResult = basicFeignService.getEnumData(Integer.parseInt(enumid));
				if (null != strResult && !"".equals(strResult)) {
					JSONObject enum_obj = JSONObject.parseObject(strResult);
					log.setUserAddress(ObjectUtils.toString(enum_obj.get("gbcode"), ""));//行政区划
				}
			}
			log.setId(UUID.randomUUID().toString().replace("-", ""));
			log.setUserId(Integer.parseInt(user_map.get("userId")));
			log.setOperationTime(new Date());//操作时间
			log.setType("1");

			//添加保存日志
			systemLogMapper.insert(log);
    	}

        //注销
        if ("/depot-system/userInfo/exitLogin".equals(url)) {
        	if (null != userJson && null != orgInfoJson
        			&& !"".equals(userJson) && !"".equals(orgInfoJson)) {
        		Map<String, String> user_map = getUserOrgInfo(userJson, orgInfoJson);
        		//修改条件
        		SystemLogExample example = new SystemLogExample();
        		SystemLogExample.Criteria criteria = example.createCriteria();
        		criteria.andUserZhEqualTo(ObjectUtils.toString(user_map.get("username"),""));
        		criteria.andOrgIdEqualTo(Integer.parseInt(user_map.get("orgId")));
        		criteria.andTypeEqualTo("1");
        		example.setOrderByClause(" dl_time desc");
        		List<SystemLog> list = systemLogMapper.selectByExample(example);

        		if (null != list && list.size() > 0) {
        			//注销时间
        			list.get(0).setZxTime(new Date());
        			list.get(0).setOperationTime(new Date());//操作时间

        			//修改登录日志信息
        			systemLogMapper.updateByPrimaryKey(list.get(0));
        		}
        	}
    	}
    }

    /**
     * 操作日志实现思路：
     * 1、URL要是可以在菜单里面找到对应菜单，那么当前这个操作属于功能操作日志
     * 2、如果没在菜单里面找到对应菜单，却在按钮中找到了，那么就是功能访问日志
     * 3、如果菜单和按钮中都没有找到对应的URL，那么说明当前这个方位没在功能管理里面配置正确，或者没有加入到功能管理中
     * 
     * @param request
     * @param response
     * @param url
     */
    @SuppressWarnings("all")
	private void operationLogger(HttpServletRequest request, HttpServletResponse response, String url) {
    	//获取用户信息和单位信息
        String userJson = ObjectUtils.toString(request.getSession().getAttribute("userInfo"),"");
        String orgInfoJson = ObjectUtils.toString(request.getSession().getAttribute("orgInfo"),"");
        Map<String, String> user_map = getUserOrgInfo(userJson, orgInfoJson);

        //是否还需要继续往下执行
        boolean flag = false;

    	//获取菜单权限并且组装功能日志
    	String func_list = (String) redisUtil.get("hasFuncList");
    	JSONArray array = JSONArray.parseArray(func_list);
    	if (null != array && array.size() > 4) {
    		JSONObject object = null;
    		SystemLogThree log = new SystemLogThree();
    		for (Iterator iterator = array.iterator(); iterator.hasNext();) {
    			object = (JSONObject) iterator.next();
    			String func_url = ObjectUtils.toString(object.get("funcUrl"));
    			if (url.equals(func_url)) {
    				log.setId(UUID.randomUUID().toString().replace("-", ""));
    				log.setType("3");//功能访问日志
    				log.setSystemIdentify(system_index);//标识
    				log.setUserId(Integer.parseInt(user_map.get("userId")));//用户ID
    				log.setUserZh(ObjectUtils.toString(user_map.get("username"),""));//账号
    				log.setUserName(ObjectUtils.toString(user_map.get("realName"),""));//名称
    				String device_ip = getIpAddr(request);
    				log.setDeviceIp(device_ip);//操作IP
    				log.setFuncId(Integer.parseInt(object.get("funcId").toString()));//功能ID
    				log.setFuncName(ObjectUtils.toString(object.get("funcName")));//功能名称
    				log.setOperationTime(new Date());//操作时间
    				log.setUserRole(ObjectUtils.toString(user_map.get("roleName"),""));//角色
    				log.setOrgId(Integer.parseInt(user_map.get("orgId")));//单位

    				String enumid = ObjectUtils.toString(user_map.get("areaCode"), "0");
    				if (!"0".equals(enumid)) {
    					String strResult = basicFeignService.getEnumData(Integer.parseInt(enumid));
    					if (null != strResult && !"".equals(strResult)) {
    						JSONObject enum_obj = JSONObject.parseObject(strResult);
    						log.setUserAddress(ObjectUtils.toString(enum_obj.get("gbcode"), ""));//行政区划
    					}
    				}

    				//添加保存日志
    				systemLogThreeMapper.insert(log);

    				//已经是操作日志了，那么没必要在遍历按钮了
    				flag = true;
    				//也不用继续当前循环了
    				break;
    			}
    		}
    	}
        //获取按钮权限并且组装访问日志
    	if (!flag) {
    		String perm_list = (String) redisUtil.get("permissionList");
    		JSONArray but_array = JSONArray.parseArray(perm_list);
        	if (null != but_array && but_array.size() > 4) {
        		JSONObject but_object = null;
        		SystemLogTwo log = new SystemLogTwo();
        		for (Iterator iterator = but_array.iterator(); iterator.hasNext();) {
        			but_object = (JSONObject) iterator.next();
        			if (but_object == null) {
        				continue;
        			}
        			String but_url = ObjectUtils.toString(but_object.get("btnUrl"), "");
        			if (url.equals(but_url)) {
        				log.setId(UUID.randomUUID().toString().replace("-", ""));
        				log.setType("2");//功能操作日志
        				log.setSystemIdentify(system_index);//标识
        				log.setUserId(Integer.parseInt(user_map.get("userId")));//用户ID
        				log.setUserZh(ObjectUtils.toString(user_map.get("username"),""));//账号
        				log.setUserName(ObjectUtils.toString(user_map.get("realName"),""));//名称
        				String device_ip = getIpAddr(request);
        				log.setDeviceIp(device_ip);//操作IP
        				String f_name = ObjectUtils.toString(but_object.get("funcName"), "");
        				String b_name = ObjectUtils.toString(but_object.get("btnName"), "");
        				String ramark = ObjectUtils.toString(but_object.get("remark"), "");
        				StringBuffer sbf = new StringBuffer();
        				if (!"".equals(ramark)) {
        					sbf.append(f_name).append("功能").append(ramark).append("操作");
        				} else {
        					sbf.append(f_name).append("功能").append(b_name).append("操作");
        				}
        				log.setFuncId(Integer.parseInt(but_object.get("funcId").toString()));//功能ID
        				log.setFuncName(ObjectUtils.toString(sbf.toString(), ""));//菜单名称
        				log.setMethodName(url.substring(url.lastIndexOf("/")+1, url.length()));//方法名
        				log.setBtnId(Integer.parseInt(but_object.get("btnId").toString()));//按钮ID
        				log.setUserRole(ObjectUtils.toString(user_map.get("roleName"),""));//角色
        				log.setOperationTime(new Date());//操作时间
        				StringBuilder param = new StringBuilder();
                        Map<String,String[]> map = request.getParameterMap();
                        Set<String> key = map.keySet();
                        for (String eachKey: key) {
                            param.append(eachKey+"="+map.get(eachKey)[0]+"； ");
                        }
        				log.setParameter(param.toString());//传入参数

        				String status = ObjectUtils.toString(response.getStatus(), "");
        				log.setOperResult(status);//操作结果状态
        				if ("200".equals(status)) {
        					log.setRtnParam("请求成功");//返回参数
        				} else {
        					log.setRtnParam("请求失败");//返回参数
        				}
        				log.setOrgId(Integer.parseInt(user_map.get("orgId")));//所属机构
        				String enumid = ObjectUtils.toString(user_map.get("areaCode"), "0");
        				if (!"0".equals(enumid)) {
        					String strResult = basicFeignService.getEnumData(Integer.parseInt(enumid));
        					if (null != strResult && !"".equals(strResult)) {
        						JSONObject enum_obj = JSONObject.parseObject(strResult);
        						log.setUserAddress(ObjectUtils.toString(enum_obj.get("gbcode"), ""));//行政区划
        					}
        				}

        				//添加保存日志
        				systemLogTwoMapper.insert(log);

        				//中断本次循环
        				break;
        			}
        		}
        	}
    	}
    }
    /**
     * 封装登录信息
     * 
     * @param userJson
     * @param orgInfoJson
     * @return
     */
    private Map<String, String> getUserOrgInfo(String userJson, String orgInfoJson) {
    	Map<String, String> user_map = new HashMap<String, String>();
    	JSONObject userinfo = JSONObject.parseObject(userJson);
    	JSONObject orginfo = JSONObject.parseObject(orgInfoJson);
    	user_map.put("userId", userinfo == null ? "" : userinfo.get("userId")+"");
    	user_map.put("username", userinfo == null ? "" : userinfo.get("username")+"");
    	user_map.put("realName", userinfo == null ? "" : userinfo.get("realName")+"");
    	user_map.put("orgId", userinfo == null ? "" : userinfo.get("orgId")+"");
    	user_map.put("roleName", userinfo == null ? "" : userinfo.get("roleNames")+"");
    	user_map.put("areaCode", orginfo == null ? "":ObjectUtils.toString(orginfo.get("areaCode")+"",""));
    	user_map.put("areaName", orginfo == null ? "":ObjectUtils.toString(orginfo.get("areaName")+"",""));
    	user_map.put("orgName", orginfo == null ? "":ObjectUtils.toString(orginfo.get("orgName")+"",""));
		return user_map;
	}

    public static void main(String[] args) {
		
		String a = "/depot-system/org/getuser";
		System.out.println(a.indexOf("/", 1));
		System.out.println(a.substring(a.lastIndexOf("/")+1, a.length()));
	}
}
