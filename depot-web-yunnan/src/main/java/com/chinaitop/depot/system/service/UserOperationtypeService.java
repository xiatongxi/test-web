package com.chinaitop.depot.system.service;

import java.util.List;

import com.chinaitop.depot.system.model.UserOperationtype;
import com.chinaitop.depot.system.model.UserOperationtypeExample;

public interface UserOperationtypeService {

	/**
	 * 根据条件查询操作类型列表
	 * @param example
	 * @return
	 */
	List<UserOperationtype> queryByExample(UserOperationtypeExample example);
}
