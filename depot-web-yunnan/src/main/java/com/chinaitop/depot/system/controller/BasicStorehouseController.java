package com.chinaitop.depot.system.controller;

import com.chinaitop.depot.system.model.BasicStorehouse;
import com.chinaitop.depot.system.model.BasicStorehouseExample;
import com.chinaitop.depot.system.model.BasicStorehouseExample.Criteria;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import java.math.BigDecimal;
import java.util.*;

/**
 * 仓房管理Controller，仓房管理菜单中所有的功能都在这里
 *
 * @author User
 *
 */
@RestController
@RequestMapping(value = "/Storehouse")
public class BasicStorehouseController {

	/*@Resource
	private BasicStorehouseService basicStorehouseService;*/

	/**
	 * 查找仓房信息
	 *
	 * @param pageNum 页数
	 * @param pageSize 每页显示的条数
	 * @param storeName 仓房名称
	 * @param houseId 仓房ID
	 * @param orgId 单位ID
	 * @param storehouseState 仓房状态
	 * @param libraryType 粮库类型
	 * @return
	 */
	@RequestMapping(value = "/getList", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public PageInfo<BasicStorehouse> getList(Integer pageNum, Integer pageSize, Integer storehouseType,
											 String storeName, Integer houseId, Integer orgId, Integer storehouseState, 
											 String libraryType, Integer delFlag) {
		/*BasicStorehouseExample example = new BasicStorehouseExample();
		Criteria Criteria = example.createCriteria();*/
		if (pageNum != null && pageSize != null) {
			PageHelper.startPage(pageNum, pageSize);
		}
		List<BasicStorehouse> list = new ArrayList<BasicStorehouse>();
		for(int i=0;i<10;i++) {
			BasicStorehouse enty = new BasicStorehouse();
			enty.setLibraryType("2");
			enty.setStorehouseId(i+1);
			enty.setStorehouseName((i+1)+"号仓");
			if(i<9) {
				enty.setStorehouseCode("00"+(i+1));
			}else {
				enty.setStorehouseCode("0"+(i+1));
			}
			enty.setStorehouseType(2978);
			if(i<2) {
				enty.setDesignCapacity(new BigDecimal(5000));
				enty.setActualCapacity(new BigDecimal(5000));
				enty.setDutystoreman("张亮");
			}else if(i==2) {
				enty.setDesignCapacity(new BigDecimal(3750));
				enty.setActualCapacity(new BigDecimal(3750));
				enty.setDutystoreman("李文生");
			}else if(i==3) {
				enty.setDesignCapacity(new BigDecimal(7500));
				enty.setActualCapacity(new BigDecimal(7500));
				enty.setDutystoreman("张亮");
			}else {
				enty.setDesignCapacity(new BigDecimal(4200));
				enty.setActualCapacity(new BigDecimal(4200));
				enty.setDutystoreman("李文生,张亮");
			}
			enty.setStorehouseState(3011);
			enty.setDelFlag(1);
			enty.setUsedate(new Date());
			list.add(enty);
		}
		/*try {
			if (null != storehouseType) {
				Criteria.andStorehouseTypeEqualTo(storehouseType);
			}
			if (null != storeName && !"".equals(storeName)) {
				Criteria.andStorehouseNameLike("%" + storeName + "%");
			}
			if (null != houseId) {
				Criteria.andStorehouseIdEqualTo(houseId);
			}
			if (null != storehouseState) {
				Criteria.andStorehouseStateEqualTo(storehouseState);
			}
			if (null != libraryType) {
				Criteria.andLibraryTypeEqualTo(libraryType);
			}

			 只能查询当前单位的数据  
			if (null != orgId) {
				Criteria.andOrgIdEqualTo(orgId);
			}

			// 值为1是没删除的数据(在用),0是已删除的数据(弃用)
			if (null != delFlag) {
				Criteria.andDelFlagEqualTo(delFlag); 
			}
			
			example.setOrderByClause(" storehouse_id asc");
			list = basicStorehouseService.findBasicStorehouse(example);
			//获取当前仓房的保管员
			if (null != list && list.size() > 0 && ParameterUtil.isequal("0",libraryType)) {
				String keeperNames = "";
				for (BasicStorehouse storehouse : list) {
					keeperNames = basicStorehouseService.getStorehouseKeeper(storehouse.getStorehouseId(), orgId, true);
					storehouse.setDutystoreman(keeperNames);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		PageInfo<BasicStorehouse> pageInfo = new PageInfo<BasicStorehouse>(list);
		return pageInfo;
	}

}