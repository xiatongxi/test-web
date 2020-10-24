package com.chinaitop.depot.system.feignService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "depot-basic")
public interface BasicFeignService {

	/**
	 * 获取一条字典数据
	 * @param username
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/Enum/findByEnum", produces = MediaType.APPLICATION_JSON_VALUE, method=RequestMethod.GET)
	String getEnumData(@RequestParam("id") Integer id);
}
