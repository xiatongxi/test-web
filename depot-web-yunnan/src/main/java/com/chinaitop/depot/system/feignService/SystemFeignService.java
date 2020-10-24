package com.chinaitop.depot.system.feignService;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "depot-system")
public interface SystemFeignService {

	/**
	 * 获取登录人和登录人的单位信息
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/userInfo/getUserData", produces = MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.GET)
	Map<String, Object> getUserData(@RequestParam("username") String username, @RequestParam("password") String password);
}
