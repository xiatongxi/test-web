package com.chinaitop.depot.system.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserOperationlogExample {
    
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public UserOperationlogExample() {
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

        public Criteria andUolIdIsNull() {
            addCriterion("uol_id is null");
            return (Criteria) this;
        }

        public Criteria andUolIdIsNotNull() {
            addCriterion("uol_id is not null");
            return (Criteria) this;
        }

        public Criteria andUolIdEqualTo(Integer value) {
            addCriterion("uol_id =", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdNotEqualTo(Integer value) {
            addCriterion("uol_id <>", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdGreaterThan(Integer value) {
            addCriterion("uol_id >", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("uol_id >=", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdLessThan(Integer value) {
            addCriterion("uol_id <", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdLessThanOrEqualTo(Integer value) {
            addCriterion("uol_id <=", value, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdIn(List<Integer> values) {
            addCriterion("uol_id in", values, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdNotIn(List<Integer> values) {
            addCriterion("uol_id not in", values, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdBetween(Integer value1, Integer value2) {
            addCriterion("uol_id between", value1, value2, "uolId");
            return (Criteria) this;
        }

        public Criteria andUolIdNotBetween(Integer value1, Integer value2) {
            addCriterion("uol_id not between", value1, value2, "uolId");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Integer value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Integer value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Integer value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Integer value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Integer value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Integer> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Integer> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Integer value1, Integer value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Integer value1, Integer value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andOperationTimeIsNull() {
            addCriterion("operation_time is null");
            return (Criteria) this;
        }

        public Criteria andOperationTimeIsNotNull() {
            addCriterion("operation_time is not null");
            return (Criteria) this;
        }

        public Criteria andOperationTimeEqualTo(Date value) {
            addCriterion("operation_time =", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeNotEqualTo(Date value) {
            addCriterion("operation_time <>", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeGreaterThan(Date value) {
            addCriterion("operation_time >", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("operation_time >=", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeLessThan(Date value) {
            addCriterion("operation_time <", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeLessThanOrEqualTo(Date value) {
            addCriterion("operation_time <=", value, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeIn(List<Date> values) {
            addCriterion("operation_time in", values, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeNotIn(List<Date> values) {
            addCriterion("operation_time not in", values, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeBetween(Date value1, Date value2) {
            addCriterion("operation_time between", value1, value2, "operationTime");
            return (Criteria) this;
        }

        public Criteria andOperationTimeNotBetween(Date value1, Date value2) {
            addCriterion("operation_time not between", value1, value2, "operationTime");
            return (Criteria) this;
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

        public Criteria andParameterValueIsNull() {
            addCriterion("parameter_value is null");
            return (Criteria) this;
        }

        public Criteria andParameterValueIsNotNull() {
            addCriterion("parameter_value is not null");
            return (Criteria) this;
        }

        public Criteria andParameterValueEqualTo(String value) {
            addCriterion("parameter_value =", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueNotEqualTo(String value) {
            addCriterion("parameter_value <>", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueGreaterThan(String value) {
            addCriterion("parameter_value >", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueGreaterThanOrEqualTo(String value) {
            addCriterion("parameter_value >=", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueLessThan(String value) {
            addCriterion("parameter_value <", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueLessThanOrEqualTo(String value) {
            addCriterion("parameter_value <=", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueLike(String value) {
            addCriterion("parameter_value like", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueNotLike(String value) {
            addCriterion("parameter_value not like", value, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueIn(List<String> values) {
            addCriterion("parameter_value in", values, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueNotIn(List<String> values) {
            addCriterion("parameter_value not in", values, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueBetween(String value1, String value2) {
            addCriterion("parameter_value between", value1, value2, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterValueNotBetween(String value1, String value2) {
            addCriterion("parameter_value not between", value1, value2, "parameterValue");
            return (Criteria) this;
        }

        public Criteria andParameterIsNull() {
            addCriterion("parameter is null");
            return (Criteria) this;
        }

        public Criteria andParameterIsNotNull() {
            addCriterion("parameter is not null");
            return (Criteria) this;
        }

        public Criteria andParameterEqualTo(String value) {
            addCriterion("parameter =", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterNotEqualTo(String value) {
            addCriterion("parameter <>", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterGreaterThan(String value) {
            addCriterion("parameter >", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterGreaterThanOrEqualTo(String value) {
            addCriterion("parameter >=", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterLessThan(String value) {
            addCriterion("parameter <", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterLessThanOrEqualTo(String value) {
            addCriterion("parameter <=", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterLike(String value) {
            addCriterion("parameter like", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterNotLike(String value) {
            addCriterion("parameter not like", value, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterIn(List<String> values) {
            addCriterion("parameter in", values, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterNotIn(List<String> values) {
            addCriterion("parameter not in", values, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterBetween(String value1, String value2) {
            addCriterion("parameter between", value1, value2, "parameter");
            return (Criteria) this;
        }

        public Criteria andParameterNotBetween(String value1, String value2) {
            addCriterion("parameter not between", value1, value2, "parameter");
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