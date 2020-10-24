package com.chinaitop.depot.system.model;

import java.io.Serializable;
import java.util.Date;

public class UserOperationlog implements Serializable{
	
	private static final long serialVersionUID = 1L;
    
    private Integer uolId;

    private Integer userId;

    private Date operationTime;

    private Integer uotId;

    private String parameterValue;

    private String parameter;
    
    private String realName;
    
    private String describes;

    /**
     * 主键
     * @return uol_id 主键
     */
    public Integer getUolId() {
        return uolId;
    }

    /**
     * 主键
     * @param uolId 主键
     */
    public void setUolId(Integer uolId) {
        this.uolId = uolId;
    }

    /**
     * 操作人
     * @return user_id 操作人
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 操作人
     * @param userId 操作人
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
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

    /**
     * 操作类型
     * @return uot_id 操作类型
     */
    public Integer getUotId() {
        return uotId;
    }

    /**
     * 操作类型
     * @param uotId 操作类型
     */
    public void setUotId(Integer uotId) {
        this.uotId = uotId;
    }

    /**
     * 编号
     * @return parameter_value 编号
     */
    public String getParameterValue() {
        return parameterValue;
    }

    /**
     * 编号
     * @param parameterValue 编号
     */
    public void setParameterValue(String parameterValue) {
        this.parameterValue = parameterValue == null ? null : parameterValue.trim();
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
     * 操作人姓名
     * @return real_name 操作人姓名
     */
	public String getRealName() {
		return realName;
	}

	/**
     * 操作人姓名
     * @param realName 操作人姓名
     */
	public void setRealName(String realName) {
		this.realName = realName;
	}

	/**
     * 操作描述
     * @return describes 操作描述
     */
	public String getDescribes() {
		return describes;
	}

	/**
     * 操作描述
     * @param describes 操作描述
     */
	public void setDescribes(String describes) {
		this.describes = describes;
	}
    
    
}