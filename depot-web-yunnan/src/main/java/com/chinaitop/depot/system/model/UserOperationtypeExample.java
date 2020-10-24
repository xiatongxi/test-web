package com.chinaitop.depot.system.model;

import java.util.ArrayList;
import java.util.List;

public class UserOperationtypeExample {
    
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UserOperationtypeExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andUotIdIsNull() {
            addCriterion("uot_id is null");
            return (Criteria) this;
        }

        public Criteria andUotIdIsNotNull() {
            addCriterion("uot_id is not null");
            return (Criteria) this;
        }

        public Criteria andUotIdEqualTo(Integer value) {
            addCriterion("uot_id =", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdNotEqualTo(Integer value) {
            addCriterion("uot_id <>", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdGreaterThan(Integer value) {
            addCriterion("uot_id >", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("uot_id >=", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdLessThan(Integer value) {
            addCriterion("uot_id <", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdLessThanOrEqualTo(Integer value) {
            addCriterion("uot_id <=", value, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdIn(List<Integer> values) {
            addCriterion("uot_id in", values, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdNotIn(List<Integer> values) {
            addCriterion("uot_id not in", values, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdBetween(Integer value1, Integer value2) {
            addCriterion("uot_id between", value1, value2, "uotId");
            return (Criteria) this;
        }

        public Criteria andUotIdNotBetween(Integer value1, Integer value2) {
            addCriterion("uot_id not between", value1, value2, "uotId");
            return (Criteria) this;
        }

        public Criteria andOperationUrlIsNull() {
            addCriterion("operation_url is null");
            return (Criteria) this;
        }

        public Criteria andOperationUrlIsNotNull() {
            addCriterion("operation_url is not null");
            return (Criteria) this;
        }

        public Criteria andOperationUrlEqualTo(String value) {
            addCriterion("operation_url =", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlNotEqualTo(String value) {
            addCriterion("operation_url <>", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlGreaterThan(String value) {
            addCriterion("operation_url >", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlGreaterThanOrEqualTo(String value) {
            addCriterion("operation_url >=", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlLessThan(String value) {
            addCriterion("operation_url <", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlLessThanOrEqualTo(String value) {
            addCriterion("operation_url <=", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlLike(String value) {
            addCriterion("operation_url like", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlNotLike(String value) {
            addCriterion("operation_url not like", value, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlIn(List<String> values) {
            addCriterion("operation_url in", values, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlNotIn(List<String> values) {
            addCriterion("operation_url not in", values, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlBetween(String value1, String value2) {
            addCriterion("operation_url between", value1, value2, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andOperationUrlNotBetween(String value1, String value2) {
            addCriterion("operation_url not between", value1, value2, "operationUrl");
            return (Criteria) this;
        }

        public Criteria andDescribesIsNull() {
            addCriterion("describes is null");
            return (Criteria) this;
        }

        public Criteria andDescribesIsNotNull() {
            addCriterion("describes is not null");
            return (Criteria) this;
        }

        public Criteria andDescribesEqualTo(String value) {
            addCriterion("describes =", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesNotEqualTo(String value) {
            addCriterion("describes <>", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesGreaterThan(String value) {
            addCriterion("describes >", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesGreaterThanOrEqualTo(String value) {
            addCriterion("describes >=", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesLessThan(String value) {
            addCriterion("describes <", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesLessThanOrEqualTo(String value) {
            addCriterion("describes <=", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesLike(String value) {
            addCriterion("describes like", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesNotLike(String value) {
            addCriterion("describes not like", value, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesIn(List<String> values) {
            addCriterion("describes in", values, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesNotIn(List<String> values) {
            addCriterion("describes not in", values, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesBetween(String value1, String value2) {
            addCriterion("describes between", value1, value2, "describes");
            return (Criteria) this;
        }

        public Criteria andDescribesNotBetween(String value1, String value2) {
            addCriterion("describes not between", value1, value2, "describes");
            return (Criteria) this;
        }

        public Criteria andParameterNameIsNull() {
            addCriterion("parameter_name is null");
            return (Criteria) this;
        }

        public Criteria andParameterNameIsNotNull() {
            addCriterion("parameter_name is not null");
            return (Criteria) this;
        }

        public Criteria andParameterNameEqualTo(String value) {
            addCriterion("parameter_name =", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameNotEqualTo(String value) {
            addCriterion("parameter_name <>", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameGreaterThan(String value) {
            addCriterion("parameter_name >", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameGreaterThanOrEqualTo(String value) {
            addCriterion("parameter_name >=", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameLessThan(String value) {
            addCriterion("parameter_name <", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameLessThanOrEqualTo(String value) {
            addCriterion("parameter_name <=", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameLike(String value) {
            addCriterion("parameter_name like", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameNotLike(String value) {
            addCriterion("parameter_name not like", value, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameIn(List<String> values) {
            addCriterion("parameter_name in", values, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameNotIn(List<String> values) {
            addCriterion("parameter_name not in", values, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameBetween(String value1, String value2) {
            addCriterion("parameter_name between", value1, value2, "parameterName");
            return (Criteria) this;
        }

        public Criteria andParameterNameNotBetween(String value1, String value2) {
            addCriterion("parameter_name not between", value1, value2, "parameterName");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}