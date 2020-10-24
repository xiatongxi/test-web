package com.chinaitop.depot.system.service.impl;

import com.chinaitop.depot.system.mapper.UserOperationlogMapper;
import com.chinaitop.depot.system.model.UserOperationlog;
import com.chinaitop.depot.system.service.UserOperationlogService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @auther hf
 * @createtime 2018/11/28
 */
@Service
public class UserOperationlogServiceImpl implements UserOperationlogService {

    @Resource
    private UserOperationlogMapper userOperationlogMapper;

	@Override
	public void AddLogMsg(UserOperationlog userOperationlog) {
		userOperationlogMapper.insertSelective(userOperationlog);
	}

}
