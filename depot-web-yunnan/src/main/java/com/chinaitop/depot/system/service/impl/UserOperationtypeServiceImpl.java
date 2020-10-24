package com.chinaitop.depot.system.service.impl;

import com.chinaitop.depot.system.mapper.UserOperationtypeMapper;
import com.chinaitop.depot.system.model.UserOperationtype;
import com.chinaitop.depot.system.model.UserOperationtypeExample;
import com.chinaitop.depot.system.service.UserOperationtypeService;

import org.springframework.stereotype.Service;

import java.util.List;

import javax.annotation.Resource;

/**
 * @auther hf
 * @createtime 2018/11/28
 */
@Service
public class UserOperationtypeServiceImpl implements UserOperationtypeService {

    @Resource
    private UserOperationtypeMapper userOperationtypeMapper;

	@Override
	public List<UserOperationtype> queryByExample(UserOperationtypeExample example) {
		return userOperationtypeMapper.selectByExample(example);
	}

}
