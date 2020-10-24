package com.chinaitop.depot.system.service;

import com.chinaitop.depot.system.model.UserOperationlog;

public interface UserOperationlogService {
	
	/**
     * 操作记录插入
     * @param UserOperationlog userOperationlog对象
     */
    void AddLogMsg(UserOperationlog userOperationlog);
}
