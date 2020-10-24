package com.chinaitop.depot.system.model;

import java.util.Date;

public class SystemLogTwo {
    private String id;

    private Integer orgId;

    private Integer userId;

    private String userZh;

    private String userName;

    private String userRole;

    private String userAddress;

    private Date dlTime;

    private Date zxTime;

    private Integer funcId;

    private String funcName;

    private Integer btnId;

    private String methodName;

    private String operResult;

    private String parameter;

    private String rtnParam;

    private String describes;

    private String type;

    private String deviceIp;

    private String systemIdentify;

    private Date operationTime;

    /**
     * 主键
     * @return id 主键
     */
    public String getId() {
        return id;
    }

    /**
     * 主键
     * @param id 主键
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * 机构id
     * @return org_id 机构id
     */
    public Integer getOrgId() {
        return orgId;
    }

    /**
     * 机构id
     * @param orgId 机构id
     */
    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    /**
     * 用户id
     * @return user_id 用户id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 用户id
     * @param userId 用户id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 用户账号
     * @return user_zh 用户账号
     */
    public String getUserZh() {
        return userZh;
    }

    /**
     * 用户账号
     * @param userZh 用户账号
     */
    public void setUserZh(String userZh) {
        this.userZh = userZh == null ? null : userZh.trim();
    }

    /**
     * 用户名称
     * @return user_name 用户名称
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 用户名称
     * @param userName 用户名称
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * 用户角色
     * @return user_role 用户角色
     */
    public String getUserRole() {
        return userRole;
    }

    /**
     * 用户角色
     * @param userRole 用户角色
     */
    public void setUserRole(String userRole) {
        this.userRole = userRole == null ? null : userRole.trim();
    }

    /**
     * 用户所属机构行政区划
     * @return user_address 用户所属机构行政区划
     */
    public String getUserAddress() {
        return userAddress;
    }

    /**
     * 用户所属机构行政区划
     * @param userAddress 用户所属机构行政区划
     */
    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress == null ? null : userAddress.trim();
    }

    /**
     * 登录时间
     * @return dl_time 登录时间
     */
    public Date getDlTime() {
        return dlTime;
    }

    /**
     * 登录时间
     * @param dlTime 登录时间
     */
    public void setDlTime(Date dlTime) {
        this.dlTime = dlTime;
    }

    /**
     * 注销时间
     * @return zx_time 注销时间
     */
    public Date getZxTime() {
        return zxTime;
    }

    /**
     * 注销时间
     * @param zxTime 注销时间
     */
    public void setZxTime(Date zxTime) {
        this.zxTime = zxTime;
    }

    /**
     * 功能id
     * @return func_id 功能id
     */
    public Integer getFuncId() {
        return funcId;
    }

    /**
     * 功能id
     * @param funcId 功能id
     */
    public void setFuncId(Integer funcId) {
        this.funcId = funcId;
    }

    /**
     * 菜单名称
     * @return func_name 菜单名称
     */
    public String getFuncName() {
        return funcName;
    }

    /**
     * 菜单名称
     * @param funcName 菜单名称
     */
    public void setFuncName(String funcName) {
        this.funcName = funcName == null ? null : funcName.trim();
    }

    /**
     * 按钮id
     * @return btn_id 按钮id
     */
    public Integer getBtnId() {
        return btnId;
    }

    /**
     * 按钮id
     * @param btnId 按钮id
     */
    public void setBtnId(Integer btnId) {
        this.btnId = btnId;
    }

    /**
     * 方法名
     * @return method_name 方法名
     */
    public String getMethodName() {
        return methodName;
    }

    /**
     * 方法名
     * @param methodName 方法名
     */
    public void setMethodName(String methodName) {
        this.methodName = methodName == null ? null : methodName.trim();
    }

    /**
     * 操作结果
     * @return oper_result 操作结果
     */
    public String getOperResult() {
        return operResult;
    }

    /**
     * 操作结果
     * @param operResult 操作结果
     */
    public void setOperResult(String operResult) {
        this.operResult = operResult == null ? null : operResult.trim();
    }

    /**
     * 请求参数
     * @return parameter 请求参数
     */
    public String getParameter() {
        return parameter;
    }

    /**
     * 请求参数
     * @param parameter 请求参数
     */
    public void setParameter(String parameter) {
        this.parameter = parameter == null ? null : parameter.trim();
    }

    /**
     * 返回参数
     * @return rtn_param 返回参数
     */
    public String getRtnParam() {
        return rtnParam;
    }

    /**
     * 返回参数
     * @param rtnParam 返回参数
     */
    public void setRtnParam(String rtnParam) {
        this.rtnParam = rtnParam == null ? null : rtnParam.trim();
    }

    /**
     * 日志描述
     * @return describes 日志描述
     */
    public String getDescribes() {
        return describes;
    }

    /**
     * 日志描述
     * @param describes 日志描述
     */
    public void setDescribes(String describes) {
        this.describes = describes == null ? null : describes.trim();
    }

    /**
     * 日志类型：1 登录 2 访问 3 操作
     * @return type 日志类型：1 登录 2 访问 3 操作
     */
    public String getType() {
        return type;
    }

    /**
     * 日志类型：1 登录 2 访问 3 操作
     * @param type 日志类型：1 登录 2 访问 3 操作
     */
    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    /**
     * 设备ip
     * @return device_ip 设备ip
     */
    public String getDeviceIp() {
        return deviceIp;
    }

    /**
     * 设备ip
     * @param deviceIp 设备ip
     */
    public void setDeviceIp(String deviceIp) {
        this.deviceIp = deviceIp == null ? null : deviceIp.trim();
    }

    /**
     * 系统标识：库级系统
     * @return system_identify 系统标识：库级系统
     */
    public String getSystemIdentify() {
        return systemIdentify;
    }

    /**
     * 系统标识：库级系统
     * @param systemIdentify 系统标识：库级系统
     */
    public void setSystemIdentify(String systemIdentify) {
        this.systemIdentify = systemIdentify == null ? null : systemIdentify.trim();
    }

    /**
     * 操作时间
     * @return operation_time 操作时间
     */
    public Date getOperationTime() {
        return operationTime;
    }

    /**
     * 操作时间
     * @param operationTime 操作时间
     */
    public void setOperationTime(Date operationTime) {
        this.operationTime = operationTime;
    }
}