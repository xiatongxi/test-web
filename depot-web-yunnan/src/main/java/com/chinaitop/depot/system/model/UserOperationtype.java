package com.chinaitop.depot.system.model;

import java.io.Serializable;

public class UserOperationtype implements Serializable{
	
	private static final long serialVersionUID = 1L;
    
    private Integer uotId;

    private String operationUrl;

    private String describes;

    private String parameterName;

    /**
     * 主键
     * @return uot_id 主键
     */
    public Integer getUotId() {
        return uotId;
    }

    /**
     * 主键
     * @param uotId 主键
     */
    public void setUotId(Integer uotId) {
        this.uotId = uotId;
    }

    /**
     * 操作路径
     * @return operation_url 操作路径
     */
    public String getOperationUrl() {
        return operationUrl;
    }

    /**
     * 操作路径
     * @param operationUrl 操作路径
     */
    public void setOperationUrl(String operationUrl) {
        this.operationUrl = operationUrl == null ? null : operationUrl.trim();
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
        this.describes = describes == null ? null : describes.trim();
    }

    /**
     * 参数名称
     * @return parameter_name 参数名称
     */
    public String getParameterName() {
        return parameterName;
    }

    /**
     * 参数名称
     * @param parameterName 参数名称
     */
    public void setParameterName(String parameterName) {
        this.parameterName = parameterName == null ? null : parameterName.trim();
    }
}