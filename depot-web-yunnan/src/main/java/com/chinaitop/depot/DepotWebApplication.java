package com.chinaitop.depot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableZuulProxy //zuul网关路由转发必须加这个注解
@EnableEurekaClient
@EnableDiscoveryClient
@EnableFeignClients
@SpringBootApplication
@MapperScan(basePackages = {"com.chinaitop.depot.*.mapper"})
public class DepotWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(DepotWebApplication.class, args);
	}
	
	/*@Bean
	public LogRecodeFilter logRecodeFilter() {
		return new LogRecodeFilter();
	}*/
}
