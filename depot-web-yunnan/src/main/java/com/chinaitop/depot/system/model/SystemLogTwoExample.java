package com.chinaitop.depot.system.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SystemLogTwoExample {
    /**
     * system_log_two
     */
    protected String orderByClause;

    /**
     * system_log_two
     */
    protected boolean distinct;

    /**
     * system_log_two
     */
    protected List<Criteria> oredCriteria;

    public SystemLogTwoExample() {
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

    /**
     * system_log_two 2020-08-03
     */
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

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(String value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(String value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(String value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(String value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(String value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(String value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLike(String value) {
            addCriterion("id like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotLike(String value) {
            addCriterion("id not like", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<String> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<String> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(String value1, String value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(String value1, String value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andOrgIdIsNull() {
            addCriterion("org_id is null");
            return (Criteria) this;
        }

        public Criteria andOrgIdIsNotNull() {
            addCriterion("org_id is not null");
            return (Criteria) this;
        }

        public Criteria andOrgIdEqualTo(Integer value) {
            addCriterion("org_id =", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdNotEqualTo(Integer value) {
            addCriterion("org_id <>", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdGreaterThan(Integer value) {
            addCriterion("org_id >", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("org_id >=", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdLessThan(Integer value) {
            addCriterion("org_id <", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdLessThanOrEqualTo(Integer value) {
            addCriterion("org_id <=", value, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdIn(List<Integer> values) {
            addCriterion("org_id in", values, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdNotIn(List<Integer> values) {
            addCriterion("org_id not in", values, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdBetween(Integer value1, Integer value2) {
            addCriterion("org_id between", value1, value2, "orgId");
            return (Criteria) this;
        }

        public Criteria andOrgIdNotBetween(Integer value1, Integer value2) {
            addCriterion("org_id not between", value1, value2, "orgId");
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

        public Criteria andUserZhIsNull() {
            addCriterion("user_zh is null");
            return (Criteria) this;
        }

        public Criteria andUserZhIsNotNull() {
            addCriterion("user_zh is not null");
            return (Criteria) this;
        }

        public Criteria andUserZhEqualTo(String value) {
            addCriterion("user_zh =", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhNotEqualTo(String value) {
            addCriterion("user_zh <>", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhGreaterThan(String value) {
            addCriterion("user_zh >", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhGreaterThanOrEqualTo(String value) {
            addCriterion("user_zh >=", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhLessThan(String value) {
            addCriterion("user_zh <", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhLessThanOrEqualTo(String value) {
            addCriterion("user_zh <=", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhLike(String value) {
            addCriterion("user_zh like", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhNotLike(String value) {
            addCriterion("user_zh not like", value, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhIn(List<String> values) {
            addCriterion("user_zh in", values, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhNotIn(List<String> values) {
            addCriterion("user_zh not in", values, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhBetween(String value1, String value2) {
            addCriterion("user_zh between", value1, value2, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserZhNotBetween(String value1, String value2) {
            addCriterion("user_zh not between", value1, value2, "userZh");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNull() {
            addCriterion("user_name is null");
            return (Criteria) this;
        }

        public Criteria andUserNameIsNotNull() {
            addCriterion("user_name is not null");
            return (Criteria) this;
        }

        public Criteria andUserNameEqualTo(String value) {
            addCriterion("user_name =", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotEqualTo(String value) {
            addCriterion("user_name <>", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThan(String value) {
            addCriterion("user_name >", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameGreaterThanOrEqualTo(String value) {
            addCriterion("user_name >=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThan(String value) {
            addCriterion("user_name <", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLessThanOrEqualTo(String value) {
            addCriterion("user_name <=", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameLike(String value) {
            addCriterion("user_name like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotLike(String value) {
            addCriterion("user_name not like", value, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameIn(List<String> values) {
            addCriterion("user_name in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotIn(List<String> values) {
            addCriterion("user_name not in", values, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameBetween(String value1, String value2) {
            addCriterion("user_name between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andUserNameNotBetween(String value1, String value2) {
            addCriterion("user_name not between", value1, value2, "userName");
            return (Criteria) this;
        }

        public Criteria andUserRoleIsNull() {
            addCriterion("user_role is null");
            return (Criteria) this;
        }

        public Criteria andUserRoleIsNotNull() {
            addCriterion("user_role is not null");
            return (Criteria) this;
        }

        public Criteria andUserRoleEqualTo(String value) {
            addCriterion("user_role =", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleNotEqualTo(String value) {
            addCriterion("user_role <>", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleGreaterThan(String value) {
            addCriterion("user_role >", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleGreaterThanOrEqualTo(String value) {
            addCriterion("user_role >=", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleLessThan(String value) {
            addCriterion("user_role <", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleLessThanOrEqualTo(String value) {
            addCriterion("user_role <=", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleLike(String value) {
            addCriterion("user_role like", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleNotLike(String value) {
            addCriterion("user_role not like", value, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleIn(List<String> values) {
            addCriterion("user_role in", values, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleNotIn(List<String> values) {
            addCriterion("user_role not in", values, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleBetween(String value1, String value2) {
            addCriterion("user_role between", value1, value2, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserRoleNotBetween(String value1, String value2) {
            addCriterion("user_role not between", value1, value2, "userRole");
            return (Criteria) this;
        }

        public Criteria andUserAddressIsNull() {
            addCriterion("user_address is null");
            return (Criteria) this;
        }

        public Criteria andUserAddressIsNotNull() {
            addCriterion("user_address is not null");
            return (Criteria) this;
        }

        public Criteria andUserAddressEqualTo(String value) {
            addCriterion("user_address =", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressNotEqualTo(String value) {
            addCriterion("user_address <>", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressGreaterThan(String value) {
            addCriterion("user_address >", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressGreaterThanOrEqualTo(String value) {
            addCriterion("user_address >=", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressLessThan(String value) {
            addCriterion("user_address <", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressLessThanOrEqualTo(String value) {
            addCriterion("user_address <=", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressLike(String value) {
            addCriterion("user_address like", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressNotLike(String value) {
            addCriterion("user_address not like", value, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressIn(List<String> values) {
            addCriterion("user_address in", values, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressNotIn(List<String> values) {
            addCriterion("user_address not in", values, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressBetween(String value1, String value2) {
            addCriterion("user_address between", value1, value2, "userAddress");
            return (Criteria) this;
        }

        public Criteria andUserAddressNotBetween(String value1, String value2) {
            addCriterion("user_address not between", value1, value2, "userAddress");
            return (Criteria) this;
        }

        public Criteria andDlTimeIsNull() {
            addCriterion("dl_time is null");
            return (Criteria) this;
        }

        public Criteria andDlTimeIsNotNull() {
            addCriterion("dl_time is not null");
            return (Criteria) this;
        }

        public Criteria andDlTimeEqualTo(Date value) {
            addCriterion("dl_time =", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeNotEqualTo(Date value) {
            addCriterion("dl_time <>", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeGreaterThan(Date value) {
            addCriterion("dl_time >", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("dl_time >=", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeLessThan(Date value) {
            addCriterion("dl_time <", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeLessThanOrEqualTo(Date value) {
            addCriterion("dl_time <=", value, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeIn(List<Date> values) {
            addCriterion("dl_time in", values, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeNotIn(List<Date> values) {
            addCriterion("dl_time not in", values, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeBetween(Date value1, Date value2) {
            addCriterion("dl_time between", value1, value2, "dlTime");
            return (Criteria) this;
        }

        public Criteria andDlTimeNotBetween(Date value1, Date value2) {
            addCriterion("dl_time not between", value1, value2, "dlTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeIsNull() {
            addCriterion("zx_time is null");
            return (Criteria) this;
        }

        public Criteria andZxTimeIsNotNull() {
            addCriterion("zx_time is not null");
            return (Criteria) this;
        }

        public Criteria andZxTimeEqualTo(Date value) {
            addCriterion("zx_time =", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeNotEqualTo(Date value) {
            addCriterion("zx_time <>", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeGreaterThan(Date value) {
            addCriterion("zx_time >", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("zx_time >=", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeLessThan(Date value) {
            addCriterion("zx_time <", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeLessThanOrEqualTo(Date value) {
            addCriterion("zx_time <=", value, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeIn(List<Date> values) {
            addCriterion("zx_time in", values, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeNotIn(List<Date> values) {
            addCriterion("zx_time not in", values, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeBetween(Date value1, Date value2) {
            addCriterion("zx_time between", value1, value2, "zxTime");
            return (Criteria) this;
        }

        public Criteria andZxTimeNotBetween(Date value1, Date value2) {
            addCriterion("zx_time not between", value1, value2, "zxTime");
            return (Criteria) this;
        }

        public Criteria andFuncIdIsNull() {
            addCriterion("func_id is null");
            return (Criteria) this;
        }

        public Criteria andFuncIdIsNotNull() {
            addCriterion("func_id is not null");
            return (Criteria) this;
        }

        public Criteria andFuncIdEqualTo(Integer value) {
            addCriterion("func_id =", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdNotEqualTo(Integer value) {
            addCriterion("func_id <>", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdGreaterThan(Integer value) {
            addCriterion("func_id >", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("func_id >=", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdLessThan(Integer value) {
            addCriterion("func_id <", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdLessThanOrEqualTo(Integer value) {
            addCriterion("func_id <=", value, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdIn(List<Integer> values) {
            addCriterion("func_id in", values, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdNotIn(List<Integer> values) {
            addCriterion("func_id not in", values, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdBetween(Integer value1, Integer value2) {
            addCriterion("func_id between", value1, value2, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncIdNotBetween(Integer value1, Integer value2) {
            addCriterion("func_id not between", value1, value2, "funcId");
            return (Criteria) this;
        }

        public Criteria andFuncNameIsNull() {
            addCriterion("func_name is null");
            return (Criteria) this;
        }

        public Criteria andFuncNameIsNotNull() {
            addCriterion("func_name is not null");
            return (Criteria) this;
        }

        public Criteria andFuncNameEqualTo(String value) {
            addCriterion("func_name =", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameNotEqualTo(String value) {
            addCriterion("func_name <>", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameGreaterThan(String value) {
            addCriterion("func_name >", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameGreaterThanOrEqualTo(String value) {
            addCriterion("func_name >=", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameLessThan(String value) {
            addCriterion("func_name <", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameLessThanOrEqualTo(String value) {
            addCriterion("func_name <=", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameLike(String value) {
            addCriterion("func_name like", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameNotLike(String value) {
            addCriterion("func_name not like", value, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameIn(List<String> values) {
            addCriterion("func_name in", values, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameNotIn(List<String> values) {
            addCriterion("func_name not in", values, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameBetween(String value1, String value2) {
            addCriterion("func_name between", value1, value2, "funcName");
            return (Criteria) this;
        }

        public Criteria andFuncNameNotBetween(String value1, String value2) {
            addCriterion("func_name not between", value1, value2, "funcName");
            return (Criteria) this;
        }

        public Criteria andBtnIdIsNull() {
            addCriterion("btn_id is null");
            return (Criteria) this;
        }

        public Criteria andBtnIdIsNotNull() {
            addCriterion("btn_id is not null");
            return (Criteria) this;
        }

        public Criteria andBtnIdEqualTo(Integer value) {
            addCriterion("btn_id =", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdNotEqualTo(Integer value) {
            addCriterion("btn_id <>", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdGreaterThan(Integer value) {
            addCriterion("btn_id >", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("btn_id >=", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdLessThan(Integer value) {
            addCriterion("btn_id <", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdLessThanOrEqualTo(Integer value) {
            addCriterion("btn_id <=", value, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdIn(List<Integer> values) {
            addCriterion("btn_id in", values, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdNotIn(List<Integer> values) {
            addCriterion("btn_id not in", values, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdBetween(Integer value1, Integer value2) {
            addCriterion("btn_id between", value1, value2, "btnId");
            return (Criteria) this;
        }

        public Criteria andBtnIdNotBetween(Integer value1, Integer value2) {
            addCriterion("btn_id not between", value1, value2, "btnId");
            return (Criteria) this;
        }

        public Criteria andMethodNameIsNull() {
            addCriterion("method_name is null");
            return (Criteria) this;
        }

        public Criteria andMethodNameIsNotNull() {
            addCriterion("method_name is not null");
            return (Criteria) this;
        }

        public Criteria andMethodNameEqualTo(String value) {
            addCriterion("method_name =", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameNotEqualTo(String value) {
            addCriterion("method_name <>", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameGreaterThan(String value) {
            addCriterion("method_name >", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameGreaterThanOrEqualTo(String value) {
            addCriterion("method_name >=", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameLessThan(String value) {
            addCriterion("method_name <", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameLessThanOrEqualTo(String value) {
            addCriterion("method_name <=", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameLike(String value) {
            addCriterion("method_name like", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameNotLike(String value) {
            addCriterion("method_name not like", value, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameIn(List<String> values) {
            addCriterion("method_name in", values, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameNotIn(List<String> values) {
            addCriterion("method_name not in", values, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameBetween(String value1, String value2) {
            addCriterion("method_name between", value1, value2, "methodName");
            return (Criteria) this;
        }

        public Criteria andMethodNameNotBetween(String value1, String value2) {
            addCriterion("method_name not between", value1, value2, "methodName");
            return (Criteria) this;
        }

        public Criteria andOperResultIsNull() {
            addCriterion("oper_result is null");
            return (Criteria) this;
        }

        public Criteria andOperResultIsNotNull() {
            addCriterion("oper_result is not null");
            return (Criteria) this;
        }

        public Criteria andOperResultEqualTo(String value) {
            addCriterion("oper_result =", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultNotEqualTo(String value) {
            addCriterion("oper_result <>", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultGreaterThan(String value) {
            addCriterion("oper_result >", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultGreaterThanOrEqualTo(String value) {
            addCriterion("oper_result >=", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultLessThan(String value) {
            addCriterion("oper_result <", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultLessThanOrEqualTo(String value) {
            addCriterion("oper_result <=", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultLike(String value) {
            addCriterion("oper_result like", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultNotLike(String value) {
            addCriterion("oper_result not like", value, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultIn(List<String> values) {
            addCriterion("oper_result in", values, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultNotIn(List<String> values) {
            addCriterion("oper_result not in", values, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultBetween(String value1, String value2) {
            addCriterion("oper_result between", value1, value2, "operResult");
            return (Criteria) this;
        }

        public Criteria andOperResultNotBetween(String value1, String value2) {
            addCriterion("oper_result not between", value1, value2, "operResult");
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

        public Criteria andRtnParamIsNull() {
            addCriterion("rtn_param is null");
            return (Criteria) this;
        }

        public Criteria andRtnParamIsNotNull() {
            addCriterion("rtn_param is not null");
            return (Criteria) this;
        }

        public Criteria andRtnParamEqualTo(String value) {
            addCriterion("rtn_param =", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamNotEqualTo(String value) {
            addCriterion("rtn_param <>", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamGreaterThan(String value) {
            addCriterion("rtn_param >", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamGreaterThanOrEqualTo(String value) {
            addCriterion("rtn_param >=", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamLessThan(String value) {
            addCriterion("rtn_param <", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamLessThanOrEqualTo(String value) {
            addCriterion("rtn_param <=", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamLike(String value) {
            addCriterion("rtn_param like", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamNotLike(String value) {
            addCriterion("rtn_param not like", value, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamIn(List<String> values) {
            addCriterion("rtn_param in", values, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamNotIn(List<String> values) {
            addCriterion("rtn_param not in", values, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamBetween(String value1, String value2) {
            addCriterion("rtn_param between", value1, value2, "rtnParam");
            return (Criteria) this;
        }

        public Criteria andRtnParamNotBetween(String value1, String value2) {
            addCriterion("rtn_param not between", value1, value2, "rtnParam");
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

        public Criteria andTypeIsNull() {
            addCriterion("type is null");
            return (Criteria) this;
        }

        public Criteria andTypeIsNotNull() {
            addCriterion("type is not null");
            return (Criteria) this;
        }

        public Criteria andTypeEqualTo(String value) {
            addCriterion("type =", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotEqualTo(String value) {
            addCriterion("type <>", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThan(String value) {
            addCriterion("type >", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeGreaterThanOrEqualTo(String value) {
            addCriterion("type >=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThan(String value) {
            addCriterion("type <", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLessThanOrEqualTo(String value) {
            addCriterion("type <=", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeLike(String value) {
            addCriterion("type like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotLike(String value) {
            addCriterion("type not like", value, "type");
            return (Criteria) this;
        }

        public Criteria andTypeIn(List<String> values) {
            addCriterion("type in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotIn(List<String> values) {
            addCriterion("type not in", values, "type");
            return (Criteria) this;
        }

        public Criteria andTypeBetween(String value1, String value2) {
            addCriterion("type between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andTypeNotBetween(String value1, String value2) {
            addCriterion("type not between", value1, value2, "type");
            return (Criteria) this;
        }

        public Criteria andDeviceIpIsNull() {
            addCriterion("device_ip is null");
            return (Criteria) this;
        }

        public Criteria andDeviceIpIsNotNull() {
            addCriterion("device_ip is not null");
            return (Criteria) this;
        }

        public Criteria andDeviceIpEqualTo(String value) {
            addCriterion("device_ip =", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpNotEqualTo(String value) {
            addCriterion("device_ip <>", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpGreaterThan(String value) {
            addCriterion("device_ip >", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpGreaterThanOrEqualTo(String value) {
            addCriterion("device_ip >=", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpLessThan(String value) {
            addCriterion("device_ip <", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpLessThanOrEqualTo(String value) {
            addCriterion("device_ip <=", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpLike(String value) {
            addCriterion("device_ip like", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpNotLike(String value) {
            addCriterion("device_ip not like", value, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpIn(List<String> values) {
            addCriterion("device_ip in", values, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpNotIn(List<String> values) {
            addCriterion("device_ip not in", values, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpBetween(String value1, String value2) {
            addCriterion("device_ip between", value1, value2, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andDeviceIpNotBetween(String value1, String value2) {
            addCriterion("device_ip not between", value1, value2, "deviceIp");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyIsNull() {
            addCriterion("system_identify is null");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyIsNotNull() {
            addCriterion("system_identify is not null");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyEqualTo(String value) {
            addCriterion("system_identify =", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyNotEqualTo(String value) {
            addCriterion("system_identify <>", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyGreaterThan(String value) {
            addCriterion("system_identify >", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyGreaterThanOrEqualTo(String value) {
            addCriterion("system_identify >=", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyLessThan(String value) {
            addCriterion("system_identify <", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyLessThanOrEqualTo(String value) {
            addCriterion("system_identify <=", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyLike(String value) {
            addCriterion("system_identify like", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyNotLike(String value) {
            addCriterion("system_identify not like", value, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyIn(List<String> values) {
            addCriterion("system_identify in", values, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyNotIn(List<String> values) {
            addCriterion("system_identify not in", values, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyBetween(String value1, String value2) {
            addCriterion("system_identify between", value1, value2, "systemIdentify");
            return (Criteria) this;
        }

        public Criteria andSystemIdentifyNotBetween(String value1, String value2) {
            addCriterion("system_identify not between", value1, value2, "systemIdentify");
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
    }

    /**
     * system_log_two
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * system_log_two 2020-08-03
     */
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