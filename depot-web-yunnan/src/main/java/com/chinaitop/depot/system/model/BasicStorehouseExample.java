package com.chinaitop.depot.system.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BasicStorehouseExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BasicStorehouseExample() {
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

        public Criteria andStorehouseIdIsNull() {
            addCriterion("storehouse_id is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdIsNotNull() {
            addCriterion("storehouse_id is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdEqualTo(Integer value) {
            addCriterion("storehouse_id =", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdNotEqualTo(Integer value) {
            addCriterion("storehouse_id <>", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdGreaterThan(Integer value) {
            addCriterion("storehouse_id >", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("storehouse_id >=", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdLessThan(Integer value) {
            addCriterion("storehouse_id <", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdLessThanOrEqualTo(Integer value) {
            addCriterion("storehouse_id <=", value, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdIn(List<Integer> values) {
            addCriterion("storehouse_id in", values, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdNotIn(List<Integer> values) {
            addCriterion("storehouse_id not in", values, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_id between", value1, value2, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andStorehouseIdNotBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_id not between", value1, value2, "storehouseId");
            return (Criteria) this;
        }

        public Criteria andUuidIsNull() {
            addCriterion("uuid is null");
            return (Criteria) this;
        }

        public Criteria andUuidIsNotNull() {
            addCriterion("uuid is not null");
            return (Criteria) this;
        }

        public Criteria andUuidEqualTo(String value) {
            addCriterion("uuid =", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidNotEqualTo(String value) {
            addCriterion("uuid <>", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidGreaterThan(String value) {
            addCriterion("uuid >", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidGreaterThanOrEqualTo(String value) {
            addCriterion("uuid >=", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidLessThan(String value) {
            addCriterion("uuid <", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidLessThanOrEqualTo(String value) {
            addCriterion("uuid <=", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidLike(String value) {
            addCriterion("uuid like", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidNotLike(String value) {
            addCriterion("uuid not like", value, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidIn(List<String> values) {
            addCriterion("uuid in", values, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidNotIn(List<String> values) {
            addCriterion("uuid not in", values, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidBetween(String value1, String value2) {
            addCriterion("uuid between", value1, value2, "uuid");
            return (Criteria) this;
        }

        public Criteria andUuidNotBetween(String value1, String value2) {
            addCriterion("uuid not between", value1, value2, "uuid");
            return (Criteria) this;
        }

        public Criteria andDepotIdIsNull() {
            addCriterion("depot_id is null");
            return (Criteria) this;
        }

        public Criteria andDepotIdIsNotNull() {
            addCriterion("depot_id is not null");
            return (Criteria) this;
        }

        public Criteria andDepotIdEqualTo(Integer value) {
            addCriterion("depot_id =", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdNotEqualTo(Integer value) {
            addCriterion("depot_id <>", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdGreaterThan(Integer value) {
            addCriterion("depot_id >", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("depot_id >=", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdLessThan(Integer value) {
            addCriterion("depot_id <", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdLessThanOrEqualTo(Integer value) {
            addCriterion("depot_id <=", value, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdIn(List<Integer> values) {
            addCriterion("depot_id in", values, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdNotIn(List<Integer> values) {
            addCriterion("depot_id not in", values, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdBetween(Integer value1, Integer value2) {
            addCriterion("depot_id between", value1, value2, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotIdNotBetween(Integer value1, Integer value2) {
            addCriterion("depot_id not between", value1, value2, "depotId");
            return (Criteria) this;
        }

        public Criteria andDepotNameIsNull() {
            addCriterion("depot_name is null");
            return (Criteria) this;
        }

        public Criteria andDepotNameIsNotNull() {
            addCriterion("depot_name is not null");
            return (Criteria) this;
        }

        public Criteria andDepotNameEqualTo(String value) {
            addCriterion("depot_name =", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameNotEqualTo(String value) {
            addCriterion("depot_name <>", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameGreaterThan(String value) {
            addCriterion("depot_name >", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameGreaterThanOrEqualTo(String value) {
            addCriterion("depot_name >=", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameLessThan(String value) {
            addCriterion("depot_name <", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameLessThanOrEqualTo(String value) {
            addCriterion("depot_name <=", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameLike(String value) {
            addCriterion("depot_name like", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameNotLike(String value) {
            addCriterion("depot_name not like", value, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameIn(List<String> values) {
            addCriterion("depot_name in", values, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameNotIn(List<String> values) {
            addCriterion("depot_name not in", values, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameBetween(String value1, String value2) {
            addCriterion("depot_name between", value1, value2, "depotName");
            return (Criteria) this;
        }

        public Criteria andDepotNameNotBetween(String value1, String value2) {
            addCriterion("depot_name not between", value1, value2, "depotName");
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

        public Criteria andOrgNameIsNull() {
            addCriterion("org_name is null");
            return (Criteria) this;
        }

        public Criteria andOrgNameIsNotNull() {
            addCriterion("org_name is not null");
            return (Criteria) this;
        }

        public Criteria andOrgNameEqualTo(String value) {
            addCriterion("org_name =", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameNotEqualTo(String value) {
            addCriterion("org_name <>", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameGreaterThan(String value) {
            addCriterion("org_name >", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameGreaterThanOrEqualTo(String value) {
            addCriterion("org_name >=", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameLessThan(String value) {
            addCriterion("org_name <", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameLessThanOrEqualTo(String value) {
            addCriterion("org_name <=", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameLike(String value) {
            addCriterion("org_name like", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameNotLike(String value) {
            addCriterion("org_name not like", value, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameIn(List<String> values) {
            addCriterion("org_name in", values, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameNotIn(List<String> values) {
            addCriterion("org_name not in", values, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameBetween(String value1, String value2) {
            addCriterion("org_name between", value1, value2, "orgName");
            return (Criteria) this;
        }

        public Criteria andOrgNameNotBetween(String value1, String value2) {
            addCriterion("org_name not between", value1, value2, "orgName");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeIsNull() {
            addCriterion("storehouse_code is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeIsNotNull() {
            addCriterion("storehouse_code is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeEqualTo(String value) {
            addCriterion("storehouse_code =", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeNotEqualTo(String value) {
            addCriterion("storehouse_code <>", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeGreaterThan(String value) {
            addCriterion("storehouse_code >", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeGreaterThanOrEqualTo(String value) {
            addCriterion("storehouse_code >=", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeLessThan(String value) {
            addCriterion("storehouse_code <", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeLessThanOrEqualTo(String value) {
            addCriterion("storehouse_code <=", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeLike(String value) {
            addCriterion("storehouse_code like", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeNotLike(String value) {
            addCriterion("storehouse_code not like", value, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeIn(List<String> values) {
            addCriterion("storehouse_code in", values, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeNotIn(List<String> values) {
            addCriterion("storehouse_code not in", values, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeBetween(String value1, String value2) {
            addCriterion("storehouse_code between", value1, value2, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseCodeNotBetween(String value1, String value2) {
            addCriterion("storehouse_code not between", value1, value2, "storehouseCode");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameIsNull() {
            addCriterion("storehouse_name is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameIsNotNull() {
            addCriterion("storehouse_name is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameEqualTo(String value) {
            addCriterion("storehouse_name =", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameNotEqualTo(String value) {
            addCriterion("storehouse_name <>", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameGreaterThan(String value) {
            addCriterion("storehouse_name >", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameGreaterThanOrEqualTo(String value) {
            addCriterion("storehouse_name >=", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameLessThan(String value) {
            addCriterion("storehouse_name <", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameLessThanOrEqualTo(String value) {
            addCriterion("storehouse_name <=", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameLike(String value) {
            addCriterion("storehouse_name like", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameNotLike(String value) {
            addCriterion("storehouse_name not like", value, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameIn(List<String> values) {
            addCriterion("storehouse_name in", values, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameNotIn(List<String> values) {
            addCriterion("storehouse_name not in", values, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameBetween(String value1, String value2) {
            addCriterion("storehouse_name between", value1, value2, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseNameNotBetween(String value1, String value2) {
            addCriterion("storehouse_name not between", value1, value2, "storehouseName");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeIsNull() {
            addCriterion("storehouse_type is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeIsNotNull() {
            addCriterion("storehouse_type is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeEqualTo(Integer value) {
            addCriterion("storehouse_type =", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeNotEqualTo(Integer value) {
            addCriterion("storehouse_type <>", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeGreaterThan(Integer value) {
            addCriterion("storehouse_type >", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("storehouse_type >=", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeLessThan(Integer value) {
            addCriterion("storehouse_type <", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeLessThanOrEqualTo(Integer value) {
            addCriterion("storehouse_type <=", value, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeIn(List<Integer> values) {
            addCriterion("storehouse_type in", values, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeNotIn(List<Integer> values) {
            addCriterion("storehouse_type not in", values, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_type between", value1, value2, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeNotBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_type not between", value1, value2, "storehouseType");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxIsNull() {
            addCriterion("storehouse_type_mx is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxIsNotNull() {
            addCriterion("storehouse_type_mx is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxEqualTo(Integer value) {
            addCriterion("storehouse_type_mx =", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxNotEqualTo(Integer value) {
            addCriterion("storehouse_type_mx <>", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxGreaterThan(Integer value) {
            addCriterion("storehouse_type_mx >", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxGreaterThanOrEqualTo(Integer value) {
            addCriterion("storehouse_type_mx >=", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxLessThan(Integer value) {
            addCriterion("storehouse_type_mx <", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxLessThanOrEqualTo(Integer value) {
            addCriterion("storehouse_type_mx <=", value, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxIn(List<Integer> values) {
            addCriterion("storehouse_type_mx in", values, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxNotIn(List<Integer> values) {
            addCriterion("storehouse_type_mx not in", values, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_type_mx between", value1, value2, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andStorehouseTypeMxNotBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_type_mx not between", value1, value2, "storehouseTypeMx");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeIsNull() {
            addCriterion("architecture_type is null");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeIsNotNull() {
            addCriterion("architecture_type is not null");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeEqualTo(String value) {
            addCriterion("architecture_type =", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeNotEqualTo(String value) {
            addCriterion("architecture_type <>", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeGreaterThan(String value) {
            addCriterion("architecture_type >", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeGreaterThanOrEqualTo(String value) {
            addCriterion("architecture_type >=", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeLessThan(String value) {
            addCriterion("architecture_type <", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeLessThanOrEqualTo(String value) {
            addCriterion("architecture_type <=", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeLike(String value) {
            addCriterion("architecture_type like", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeNotLike(String value) {
            addCriterion("architecture_type not like", value, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeIn(List<String> values) {
            addCriterion("architecture_type in", values, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeNotIn(List<String> values) {
            addCriterion("architecture_type not in", values, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeBetween(String value1, String value2) {
            addCriterion("architecture_type between", value1, value2, "architectureType");
            return (Criteria) this;
        }

        public Criteria andArchitectureTypeNotBetween(String value1, String value2) {
            addCriterion("architecture_type not between", value1, value2, "architectureType");
            return (Criteria) this;
        }

        public Criteria andStoreImgIsNull() {
            addCriterion("store_img is null");
            return (Criteria) this;
        }

        public Criteria andStoreImgIsNotNull() {
            addCriterion("store_img is not null");
            return (Criteria) this;
        }

        public Criteria andStoreImgEqualTo(String value) {
            addCriterion("store_img =", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgNotEqualTo(String value) {
            addCriterion("store_img <>", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgGreaterThan(String value) {
            addCriterion("store_img >", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgGreaterThanOrEqualTo(String value) {
            addCriterion("store_img >=", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgLessThan(String value) {
            addCriterion("store_img <", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgLessThanOrEqualTo(String value) {
            addCriterion("store_img <=", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgLike(String value) {
            addCriterion("store_img like", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgNotLike(String value) {
            addCriterion("store_img not like", value, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgIn(List<String> values) {
            addCriterion("store_img in", values, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgNotIn(List<String> values) {
            addCriterion("store_img not in", values, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgBetween(String value1, String value2) {
            addCriterion("store_img between", value1, value2, "storeImg");
            return (Criteria) this;
        }

        public Criteria andStoreImgNotBetween(String value1, String value2) {
            addCriterion("store_img not between", value1, value2, "storeImg");
            return (Criteria) this;
        }

        public Criteria andGroundIsNull() {
            addCriterion("ground is null");
            return (Criteria) this;
        }

        public Criteria andGroundIsNotNull() {
            addCriterion("ground is not null");
            return (Criteria) this;
        }

        public Criteria andGroundEqualTo(String value) {
            addCriterion("ground =", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundNotEqualTo(String value) {
            addCriterion("ground <>", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundGreaterThan(String value) {
            addCriterion("ground >", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundGreaterThanOrEqualTo(String value) {
            addCriterion("ground >=", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundLessThan(String value) {
            addCriterion("ground <", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundLessThanOrEqualTo(String value) {
            addCriterion("ground <=", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundLike(String value) {
            addCriterion("ground like", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundNotLike(String value) {
            addCriterion("ground not like", value, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundIn(List<String> values) {
            addCriterion("ground in", values, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundNotIn(List<String> values) {
            addCriterion("ground not in", values, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundBetween(String value1, String value2) {
            addCriterion("ground between", value1, value2, "ground");
            return (Criteria) this;
        }

        public Criteria andGroundNotBetween(String value1, String value2) {
            addCriterion("ground not between", value1, value2, "ground");
            return (Criteria) this;
        }

        public Criteria andWallIsNull() {
            addCriterion("wall is null");
            return (Criteria) this;
        }

        public Criteria andWallIsNotNull() {
            addCriterion("wall is not null");
            return (Criteria) this;
        }

        public Criteria andWallEqualTo(Integer value) {
            addCriterion("wall =", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallNotEqualTo(Integer value) {
            addCriterion("wall <>", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallGreaterThan(Integer value) {
            addCriterion("wall >", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallGreaterThanOrEqualTo(Integer value) {
            addCriterion("wall >=", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallLessThan(Integer value) {
            addCriterion("wall <", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallLessThanOrEqualTo(Integer value) {
            addCriterion("wall <=", value, "wall");
            return (Criteria) this;
        }

        public Criteria andWallIn(List<Integer> values) {
            addCriterion("wall in", values, "wall");
            return (Criteria) this;
        }

        public Criteria andWallNotIn(List<Integer> values) {
            addCriterion("wall not in", values, "wall");
            return (Criteria) this;
        }

        public Criteria andWallBetween(Integer value1, Integer value2) {
            addCriterion("wall between", value1, value2, "wall");
            return (Criteria) this;
        }

        public Criteria andWallNotBetween(Integer value1, Integer value2) {
            addCriterion("wall not between", value1, value2, "wall");
            return (Criteria) this;
        }

        public Criteria andRoofIsNull() {
            addCriterion("roof is null");
            return (Criteria) this;
        }

        public Criteria andRoofIsNotNull() {
            addCriterion("roof is not null");
            return (Criteria) this;
        }

        public Criteria andRoofEqualTo(String value) {
            addCriterion("roof =", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofNotEqualTo(String value) {
            addCriterion("roof <>", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofGreaterThan(String value) {
            addCriterion("roof >", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofGreaterThanOrEqualTo(String value) {
            addCriterion("roof >=", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofLessThan(String value) {
            addCriterion("roof <", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofLessThanOrEqualTo(String value) {
            addCriterion("roof <=", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofLike(String value) {
            addCriterion("roof like", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofNotLike(String value) {
            addCriterion("roof not like", value, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofIn(List<String> values) {
            addCriterion("roof in", values, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofNotIn(List<String> values) {
            addCriterion("roof not in", values, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofBetween(String value1, String value2) {
            addCriterion("roof between", value1, value2, "roof");
            return (Criteria) this;
        }

        public Criteria andRoofNotBetween(String value1, String value2) {
            addCriterion("roof not between", value1, value2, "roof");
            return (Criteria) this;
        }

        public Criteria andHouseIsNull() {
            addCriterion("house is null");
            return (Criteria) this;
        }

        public Criteria andHouseIsNotNull() {
            addCriterion("house is not null");
            return (Criteria) this;
        }

        public Criteria andHouseEqualTo(String value) {
            addCriterion("house =", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotEqualTo(String value) {
            addCriterion("house <>", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseGreaterThan(String value) {
            addCriterion("house >", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseGreaterThanOrEqualTo(String value) {
            addCriterion("house >=", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseLessThan(String value) {
            addCriterion("house <", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseLessThanOrEqualTo(String value) {
            addCriterion("house <=", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseLike(String value) {
            addCriterion("house like", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotLike(String value) {
            addCriterion("house not like", value, "house");
            return (Criteria) this;
        }

        public Criteria andHouseIn(List<String> values) {
            addCriterion("house in", values, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotIn(List<String> values) {
            addCriterion("house not in", values, "house");
            return (Criteria) this;
        }

        public Criteria andHouseBetween(String value1, String value2) {
            addCriterion("house between", value1, value2, "house");
            return (Criteria) this;
        }

        public Criteria andHouseNotBetween(String value1, String value2) {
            addCriterion("house not between", value1, value2, "house");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityIsNull() {
            addCriterion("design_capacity is null");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityIsNotNull() {
            addCriterion("design_capacity is not null");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityEqualTo(BigDecimal value) {
            addCriterion("design_capacity =", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityNotEqualTo(BigDecimal value) {
            addCriterion("design_capacity <>", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityGreaterThan(BigDecimal value) {
            addCriterion("design_capacity >", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("design_capacity >=", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityLessThan(BigDecimal value) {
            addCriterion("design_capacity <", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityLessThanOrEqualTo(BigDecimal value) {
            addCriterion("design_capacity <=", value, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityIn(List<BigDecimal> values) {
            addCriterion("design_capacity in", values, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityNotIn(List<BigDecimal> values) {
            addCriterion("design_capacity not in", values, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("design_capacity between", value1, value2, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andDesignCapacityNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("design_capacity not between", value1, value2, "designCapacity");
            return (Criteria) this;
        }

        public Criteria andKeepingWayIsNull() {
            addCriterion("keeping_way is null");
            return (Criteria) this;
        }

        public Criteria andKeepingWayIsNotNull() {
            addCriterion("keeping_way is not null");
            return (Criteria) this;
        }

        public Criteria andKeepingWayEqualTo(Integer value) {
            addCriterion("keeping_way =", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayNotEqualTo(Integer value) {
            addCriterion("keeping_way <>", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayGreaterThan(Integer value) {
            addCriterion("keeping_way >", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayGreaterThanOrEqualTo(Integer value) {
            addCriterion("keeping_way >=", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayLessThan(Integer value) {
            addCriterion("keeping_way <", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayLessThanOrEqualTo(Integer value) {
            addCriterion("keeping_way <=", value, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayIn(List<Integer> values) {
            addCriterion("keeping_way in", values, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayNotIn(List<Integer> values) {
            addCriterion("keeping_way not in", values, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayBetween(Integer value1, Integer value2) {
            addCriterion("keeping_way between", value1, value2, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andKeepingWayNotBetween(Integer value1, Integer value2) {
            addCriterion("keeping_way not between", value1, value2, "keepingWay");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthIsNull() {
            addCriterion("grain_heigth is null");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthIsNotNull() {
            addCriterion("grain_heigth is not null");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthEqualTo(BigDecimal value) {
            addCriterion("grain_heigth =", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthNotEqualTo(BigDecimal value) {
            addCriterion("grain_heigth <>", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthGreaterThan(BigDecimal value) {
            addCriterion("grain_heigth >", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_heigth >=", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthLessThan(BigDecimal value) {
            addCriterion("grain_heigth <", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_heigth <=", value, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthIn(List<BigDecimal> values) {
            addCriterion("grain_heigth in", values, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthNotIn(List<BigDecimal> values) {
            addCriterion("grain_heigth not in", values, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_heigth between", value1, value2, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_heigth not between", value1, value2, "grainHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthIsNull() {
            addCriterion("store_outside_length is null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthIsNotNull() {
            addCriterion("store_outside_length is not null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthEqualTo(BigDecimal value) {
            addCriterion("store_outside_length =", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthNotEqualTo(BigDecimal value) {
            addCriterion("store_outside_length <>", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthGreaterThan(BigDecimal value) {
            addCriterion("store_outside_length >", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_length >=", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthLessThan(BigDecimal value) {
            addCriterion("store_outside_length <", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_length <=", value, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthIn(List<BigDecimal> values) {
            addCriterion("store_outside_length in", values, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthNotIn(List<BigDecimal> values) {
            addCriterion("store_outside_length not in", values, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_length between", value1, value2, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideLengthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_length not between", value1, value2, "storeOutsideLength");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthIsNull() {
            addCriterion("store_outside_width is null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthIsNotNull() {
            addCriterion("store_outside_width is not null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthEqualTo(BigDecimal value) {
            addCriterion("store_outside_width =", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthNotEqualTo(BigDecimal value) {
            addCriterion("store_outside_width <>", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthGreaterThan(BigDecimal value) {
            addCriterion("store_outside_width >", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_width >=", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthLessThan(BigDecimal value) {
            addCriterion("store_outside_width <", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_width <=", value, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthIn(List<BigDecimal> values) {
            addCriterion("store_outside_width in", values, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthNotIn(List<BigDecimal> values) {
            addCriterion("store_outside_width not in", values, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_width between", value1, value2, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideWidthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_width not between", value1, value2, "storeOutsideWidth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthIsNull() {
            addCriterion("store_outside_heigth is null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthIsNotNull() {
            addCriterion("store_outside_heigth is not null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthEqualTo(BigDecimal value) {
            addCriterion("store_outside_heigth =", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthNotEqualTo(BigDecimal value) {
            addCriterion("store_outside_heigth <>", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthGreaterThan(BigDecimal value) {
            addCriterion("store_outside_heigth >", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_heigth >=", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthLessThan(BigDecimal value) {
            addCriterion("store_outside_heigth <", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_heigth <=", value, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthIn(List<BigDecimal> values) {
            addCriterion("store_outside_heigth in", values, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthNotIn(List<BigDecimal> values) {
            addCriterion("store_outside_heigth not in", values, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_heigth between", value1, value2, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_heigth not between", value1, value2, "storeOutsideHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthIsNull() {
            addCriterion("store_outside_top_heigth is null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthIsNotNull() {
            addCriterion("store_outside_top_heigth is not null");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthEqualTo(BigDecimal value) {
            addCriterion("store_outside_top_heigth =", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthNotEqualTo(BigDecimal value) {
            addCriterion("store_outside_top_heigth <>", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthGreaterThan(BigDecimal value) {
            addCriterion("store_outside_top_heigth >", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_top_heigth >=", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthLessThan(BigDecimal value) {
            addCriterion("store_outside_top_heigth <", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("store_outside_top_heigth <=", value, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthIn(List<BigDecimal> values) {
            addCriterion("store_outside_top_heigth in", values, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthNotIn(List<BigDecimal> values) {
            addCriterion("store_outside_top_heigth not in", values, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_top_heigth between", value1, value2, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andStoreOutsideTopHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("store_outside_top_heigth not between", value1, value2, "storeOutsideTopHeigth");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterIsNull() {
            addCriterion("outside_silo_diameter is null");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterIsNotNull() {
            addCriterion("outside_silo_diameter is not null");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterEqualTo(BigDecimal value) {
            addCriterion("outside_silo_diameter =", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterNotEqualTo(BigDecimal value) {
            addCriterion("outside_silo_diameter <>", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterGreaterThan(BigDecimal value) {
            addCriterion("outside_silo_diameter >", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("outside_silo_diameter >=", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterLessThan(BigDecimal value) {
            addCriterion("outside_silo_diameter <", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterLessThanOrEqualTo(BigDecimal value) {
            addCriterion("outside_silo_diameter <=", value, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterIn(List<BigDecimal> values) {
            addCriterion("outside_silo_diameter in", values, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterNotIn(List<BigDecimal> values) {
            addCriterion("outside_silo_diameter not in", values, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("outside_silo_diameter between", value1, value2, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOutsideSiloDiameterNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("outside_silo_diameter not between", value1, value2, "outsideSiloDiameter");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaIsNull() {
            addCriterion("outer_wall_area is null");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaIsNotNull() {
            addCriterion("outer_wall_area is not null");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaEqualTo(BigDecimal value) {
            addCriterion("outer_wall_area =", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaNotEqualTo(BigDecimal value) {
            addCriterion("outer_wall_area <>", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaGreaterThan(BigDecimal value) {
            addCriterion("outer_wall_area >", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("outer_wall_area >=", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaLessThan(BigDecimal value) {
            addCriterion("outer_wall_area <", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaLessThanOrEqualTo(BigDecimal value) {
            addCriterion("outer_wall_area <=", value, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaIn(List<BigDecimal> values) {
            addCriterion("outer_wall_area in", values, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaNotIn(List<BigDecimal> values) {
            addCriterion("outer_wall_area not in", values, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("outer_wall_area between", value1, value2, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andOuterWallAreaNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("outer_wall_area not between", value1, value2, "outerWallArea");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeIsNull() {
            addCriterion("deduct_volume is null");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeIsNotNull() {
            addCriterion("deduct_volume is not null");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeEqualTo(BigDecimal value) {
            addCriterion("deduct_volume =", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeNotEqualTo(BigDecimal value) {
            addCriterion("deduct_volume <>", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeGreaterThan(BigDecimal value) {
            addCriterion("deduct_volume >", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("deduct_volume >=", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeLessThan(BigDecimal value) {
            addCriterion("deduct_volume <", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("deduct_volume <=", value, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeIn(List<BigDecimal> values) {
            addCriterion("deduct_volume in", values, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeNotIn(List<BigDecimal> values) {
            addCriterion("deduct_volume not in", values, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("deduct_volume between", value1, value2, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andDeductVolumeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("deduct_volume not between", value1, value2, "deductVolume");
            return (Criteria) this;
        }

        public Criteria andLengthIsNull() {
            addCriterion("length is null");
            return (Criteria) this;
        }

        public Criteria andLengthIsNotNull() {
            addCriterion("length is not null");
            return (Criteria) this;
        }

        public Criteria andLengthEqualTo(BigDecimal value) {
            addCriterion("length =", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthNotEqualTo(BigDecimal value) {
            addCriterion("length <>", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthGreaterThan(BigDecimal value) {
            addCriterion("length >", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("length >=", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthLessThan(BigDecimal value) {
            addCriterion("length <", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("length <=", value, "length");
            return (Criteria) this;
        }

        public Criteria andLengthIn(List<BigDecimal> values) {
            addCriterion("length in", values, "length");
            return (Criteria) this;
        }

        public Criteria andLengthNotIn(List<BigDecimal> values) {
            addCriterion("length not in", values, "length");
            return (Criteria) this;
        }

        public Criteria andLengthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("length between", value1, value2, "length");
            return (Criteria) this;
        }

        public Criteria andLengthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("length not between", value1, value2, "length");
            return (Criteria) this;
        }

        public Criteria andWidthIsNull() {
            addCriterion("width is null");
            return (Criteria) this;
        }

        public Criteria andWidthIsNotNull() {
            addCriterion("width is not null");
            return (Criteria) this;
        }

        public Criteria andWidthEqualTo(BigDecimal value) {
            addCriterion("width =", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthNotEqualTo(BigDecimal value) {
            addCriterion("width <>", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthGreaterThan(BigDecimal value) {
            addCriterion("width >", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("width >=", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthLessThan(BigDecimal value) {
            addCriterion("width <", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("width <=", value, "width");
            return (Criteria) this;
        }

        public Criteria andWidthIn(List<BigDecimal> values) {
            addCriterion("width in", values, "width");
            return (Criteria) this;
        }

        public Criteria andWidthNotIn(List<BigDecimal> values) {
            addCriterion("width not in", values, "width");
            return (Criteria) this;
        }

        public Criteria andWidthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("width between", value1, value2, "width");
            return (Criteria) this;
        }

        public Criteria andWidthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("width not between", value1, value2, "width");
            return (Criteria) this;
        }

        public Criteria andHeigthIsNull() {
            addCriterion("heigth is null");
            return (Criteria) this;
        }

        public Criteria andHeigthIsNotNull() {
            addCriterion("heigth is not null");
            return (Criteria) this;
        }

        public Criteria andHeigthEqualTo(BigDecimal value) {
            addCriterion("heigth =", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthNotEqualTo(BigDecimal value) {
            addCriterion("heigth <>", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthGreaterThan(BigDecimal value) {
            addCriterion("heigth >", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("heigth >=", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthLessThan(BigDecimal value) {
            addCriterion("heigth <", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("heigth <=", value, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthIn(List<BigDecimal> values) {
            addCriterion("heigth in", values, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthNotIn(List<BigDecimal> values) {
            addCriterion("heigth not in", values, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("heigth between", value1, value2, "heigth");
            return (Criteria) this;
        }

        public Criteria andHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("heigth not between", value1, value2, "heigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthIsNull() {
            addCriterion("grain_line_heigth is null");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthIsNotNull() {
            addCriterion("grain_line_heigth is not null");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthEqualTo(BigDecimal value) {
            addCriterion("grain_line_heigth =", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthNotEqualTo(BigDecimal value) {
            addCriterion("grain_line_heigth <>", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthGreaterThan(BigDecimal value) {
            addCriterion("grain_line_heigth >", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_line_heigth >=", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthLessThan(BigDecimal value) {
            addCriterion("grain_line_heigth <", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_line_heigth <=", value, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthIn(List<BigDecimal> values) {
            addCriterion("grain_line_heigth in", values, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthNotIn(List<BigDecimal> values) {
            addCriterion("grain_line_heigth not in", values, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_line_heigth between", value1, value2, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andGrainLineHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_line_heigth not between", value1, value2, "grainLineHeigth");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterIsNull() {
            addCriterion("silo_diameter is null");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterIsNotNull() {
            addCriterion("silo_diameter is not null");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterEqualTo(BigDecimal value) {
            addCriterion("silo_diameter =", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterNotEqualTo(BigDecimal value) {
            addCriterion("silo_diameter <>", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterGreaterThan(BigDecimal value) {
            addCriterion("silo_diameter >", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("silo_diameter >=", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterLessThan(BigDecimal value) {
            addCriterion("silo_diameter <", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterLessThanOrEqualTo(BigDecimal value) {
            addCriterion("silo_diameter <=", value, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterIn(List<BigDecimal> values) {
            addCriterion("silo_diameter in", values, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterNotIn(List<BigDecimal> values) {
            addCriterion("silo_diameter not in", values, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("silo_diameter between", value1, value2, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andSiloDiameterNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("silo_diameter not between", value1, value2, "siloDiameter");
            return (Criteria) this;
        }

        public Criteria andBinVolumeIsNull() {
            addCriterion("bin_volume is null");
            return (Criteria) this;
        }

        public Criteria andBinVolumeIsNotNull() {
            addCriterion("bin_volume is not null");
            return (Criteria) this;
        }

        public Criteria andBinVolumeEqualTo(BigDecimal value) {
            addCriterion("bin_volume =", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeNotEqualTo(BigDecimal value) {
            addCriterion("bin_volume <>", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeGreaterThan(BigDecimal value) {
            addCriterion("bin_volume >", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("bin_volume >=", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeLessThan(BigDecimal value) {
            addCriterion("bin_volume <", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("bin_volume <=", value, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeIn(List<BigDecimal> values) {
            addCriterion("bin_volume in", values, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeNotIn(List<BigDecimal> values) {
            addCriterion("bin_volume not in", values, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("bin_volume between", value1, value2, "binVolume");
            return (Criteria) this;
        }

        public Criteria andBinVolumeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("bin_volume not between", value1, value2, "binVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeIsNull() {
            addCriterion("grain_pile_volume is null");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeIsNotNull() {
            addCriterion("grain_pile_volume is not null");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeEqualTo(BigDecimal value) {
            addCriterion("grain_pile_volume =", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeNotEqualTo(BigDecimal value) {
            addCriterion("grain_pile_volume <>", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeGreaterThan(BigDecimal value) {
            addCriterion("grain_pile_volume >", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_pile_volume >=", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeLessThan(BigDecimal value) {
            addCriterion("grain_pile_volume <", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeLessThanOrEqualTo(BigDecimal value) {
            addCriterion("grain_pile_volume <=", value, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeIn(List<BigDecimal> values) {
            addCriterion("grain_pile_volume in", values, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeNotIn(List<BigDecimal> values) {
            addCriterion("grain_pile_volume not in", values, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_pile_volume between", value1, value2, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andGrainPileVolumeNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("grain_pile_volume not between", value1, value2, "grainPileVolume");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumIsNull() {
            addCriterion("house_door_num is null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumIsNotNull() {
            addCriterion("house_door_num is not null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumEqualTo(Integer value) {
            addCriterion("house_door_num =", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumNotEqualTo(Integer value) {
            addCriterion("house_door_num <>", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumGreaterThan(Integer value) {
            addCriterion("house_door_num >", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumGreaterThanOrEqualTo(Integer value) {
            addCriterion("house_door_num >=", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumLessThan(Integer value) {
            addCriterion("house_door_num <", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumLessThanOrEqualTo(Integer value) {
            addCriterion("house_door_num <=", value, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumIn(List<Integer> values) {
            addCriterion("house_door_num in", values, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumNotIn(List<Integer> values) {
            addCriterion("house_door_num not in", values, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumBetween(Integer value1, Integer value2) {
            addCriterion("house_door_num between", value1, value2, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDoorNumNotBetween(Integer value1, Integer value2) {
            addCriterion("house_door_num not between", value1, value2, "houseDoorNum");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionIsNull() {
            addCriterion("house_doot_position is null");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionIsNotNull() {
            addCriterion("house_doot_position is not null");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionEqualTo(String value) {
            addCriterion("house_doot_position =", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionNotEqualTo(String value) {
            addCriterion("house_doot_position <>", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionGreaterThan(String value) {
            addCriterion("house_doot_position >", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionGreaterThanOrEqualTo(String value) {
            addCriterion("house_doot_position >=", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionLessThan(String value) {
            addCriterion("house_doot_position <", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionLessThanOrEqualTo(String value) {
            addCriterion("house_doot_position <=", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionLike(String value) {
            addCriterion("house_doot_position like", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionNotLike(String value) {
            addCriterion("house_doot_position not like", value, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionIn(List<String> values) {
            addCriterion("house_doot_position in", values, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionNotIn(List<String> values) {
            addCriterion("house_doot_position not in", values, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionBetween(String value1, String value2) {
            addCriterion("house_doot_position between", value1, value2, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDootPositionNotBetween(String value1, String value2) {
            addCriterion("house_doot_position not between", value1, value2, "houseDootPosition");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthIsNull() {
            addCriterion("house_door_width is null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthIsNotNull() {
            addCriterion("house_door_width is not null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthEqualTo(BigDecimal value) {
            addCriterion("house_door_width =", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthNotEqualTo(BigDecimal value) {
            addCriterion("house_door_width <>", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthGreaterThan(BigDecimal value) {
            addCriterion("house_door_width >", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("house_door_width >=", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthLessThan(BigDecimal value) {
            addCriterion("house_door_width <", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("house_door_width <=", value, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthIn(List<BigDecimal> values) {
            addCriterion("house_door_width in", values, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthNotIn(List<BigDecimal> values) {
            addCriterion("house_door_width not in", values, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("house_door_width between", value1, value2, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorWidthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("house_door_width not between", value1, value2, "houseDoorWidth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthIsNull() {
            addCriterion("house_door_heigth is null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthIsNotNull() {
            addCriterion("house_door_heigth is not null");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthEqualTo(BigDecimal value) {
            addCriterion("house_door_heigth =", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthNotEqualTo(BigDecimal value) {
            addCriterion("house_door_heigth <>", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthGreaterThan(BigDecimal value) {
            addCriterion("house_door_heigth >", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("house_door_heigth >=", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthLessThan(BigDecimal value) {
            addCriterion("house_door_heigth <", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthLessThanOrEqualTo(BigDecimal value) {
            addCriterion("house_door_heigth <=", value, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthIn(List<BigDecimal> values) {
            addCriterion("house_door_heigth in", values, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthNotIn(List<BigDecimal> values) {
            addCriterion("house_door_heigth not in", values, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("house_door_heigth between", value1, value2, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andHouseDoorHeigthNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("house_door_heigth not between", value1, value2, "houseDoorHeigth");
            return (Criteria) this;
        }

        public Criteria andDrafttypeIsNull() {
            addCriterion("draftType is null");
            return (Criteria) this;
        }

        public Criteria andDrafttypeIsNotNull() {
            addCriterion("draftType is not null");
            return (Criteria) this;
        }

        public Criteria andDrafttypeEqualTo(Integer value) {
            addCriterion("draftType =", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeNotEqualTo(Integer value) {
            addCriterion("draftType <>", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeGreaterThan(Integer value) {
            addCriterion("draftType >", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("draftType >=", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeLessThan(Integer value) {
            addCriterion("draftType <", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeLessThanOrEqualTo(Integer value) {
            addCriterion("draftType <=", value, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeIn(List<Integer> values) {
            addCriterion("draftType in", values, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeNotIn(List<Integer> values) {
            addCriterion("draftType not in", values, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeBetween(Integer value1, Integer value2) {
            addCriterion("draftType between", value1, value2, "drafttype");
            return (Criteria) this;
        }

        public Criteria andDrafttypeNotBetween(Integer value1, Integer value2) {
            addCriterion("draftType not between", value1, value2, "drafttype");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofIsNull() {
            addCriterion("heatInsulationStep_roof is null");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofIsNotNull() {
            addCriterion("heatInsulationStep_roof is not null");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofEqualTo(String value) {
            addCriterion("heatInsulationStep_roof =", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofNotEqualTo(String value) {
            addCriterion("heatInsulationStep_roof <>", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofGreaterThan(String value) {
            addCriterion("heatInsulationStep_roof >", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofGreaterThanOrEqualTo(String value) {
            addCriterion("heatInsulationStep_roof >=", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofLessThan(String value) {
            addCriterion("heatInsulationStep_roof <", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofLessThanOrEqualTo(String value) {
            addCriterion("heatInsulationStep_roof <=", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofLike(String value) {
            addCriterion("heatInsulationStep_roof like", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofNotLike(String value) {
            addCriterion("heatInsulationStep_roof not like", value, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofIn(List<String> values) {
            addCriterion("heatInsulationStep_roof in", values, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofNotIn(List<String> values) {
            addCriterion("heatInsulationStep_roof not in", values, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofBetween(String value1, String value2) {
            addCriterion("heatInsulationStep_roof between", value1, value2, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepRoofNotBetween(String value1, String value2) {
            addCriterion("heatInsulationStep_roof not between", value1, value2, "heatinsulationstepRoof");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowIsNull() {
            addCriterion("heatInsulationStep_window is null");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowIsNotNull() {
            addCriterion("heatInsulationStep_window is not null");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowEqualTo(String value) {
            addCriterion("heatInsulationStep_window =", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowNotEqualTo(String value) {
            addCriterion("heatInsulationStep_window <>", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowGreaterThan(String value) {
            addCriterion("heatInsulationStep_window >", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowGreaterThanOrEqualTo(String value) {
            addCriterion("heatInsulationStep_window >=", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowLessThan(String value) {
            addCriterion("heatInsulationStep_window <", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowLessThanOrEqualTo(String value) {
            addCriterion("heatInsulationStep_window <=", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowLike(String value) {
            addCriterion("heatInsulationStep_window like", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowNotLike(String value) {
            addCriterion("heatInsulationStep_window not like", value, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowIn(List<String> values) {
            addCriterion("heatInsulationStep_window in", values, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowNotIn(List<String> values) {
            addCriterion("heatInsulationStep_window not in", values, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowBetween(String value1, String value2) {
            addCriterion("heatInsulationStep_window between", value1, value2, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andHeatinsulationstepWindowNotBetween(String value1, String value2) {
            addCriterion("heatInsulationStep_window not between", value1, value2, "heatinsulationstepWindow");
            return (Criteria) this;
        }

        public Criteria andActualCapacityIsNull() {
            addCriterion("actual_capacity is null");
            return (Criteria) this;
        }

        public Criteria andActualCapacityIsNotNull() {
            addCriterion("actual_capacity is not null");
            return (Criteria) this;
        }

        public Criteria andActualCapacityEqualTo(BigDecimal value) {
            addCriterion("actual_capacity =", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityNotEqualTo(BigDecimal value) {
            addCriterion("actual_capacity <>", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityGreaterThan(BigDecimal value) {
            addCriterion("actual_capacity >", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("actual_capacity >=", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityLessThan(BigDecimal value) {
            addCriterion("actual_capacity <", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityLessThanOrEqualTo(BigDecimal value) {
            addCriterion("actual_capacity <=", value, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityIn(List<BigDecimal> values) {
            addCriterion("actual_capacity in", values, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityNotIn(List<BigDecimal> values) {
            addCriterion("actual_capacity not in", values, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("actual_capacity between", value1, value2, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andActualCapacityNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("actual_capacity not between", value1, value2, "actualCapacity");
            return (Criteria) this;
        }

        public Criteria andCompletionDateIsNull() {
            addCriterion("completion_date is null");
            return (Criteria) this;
        }

        public Criteria andCompletionDateIsNotNull() {
            addCriterion("completion_date is not null");
            return (Criteria) this;
        }

        public Criteria andCompletionDateEqualTo(Date value) {
            addCriterion("completion_date =", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateNotEqualTo(Date value) {
            addCriterion("completion_date <>", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateGreaterThan(Date value) {
            addCriterion("completion_date >", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateGreaterThanOrEqualTo(Date value) {
            addCriterion("completion_date >=", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateLessThan(Date value) {
            addCriterion("completion_date <", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateLessThanOrEqualTo(Date value) {
            addCriterion("completion_date <=", value, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateIn(List<Date> values) {
            addCriterion("completion_date in", values, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateNotIn(List<Date> values) {
            addCriterion("completion_date not in", values, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateBetween(Date value1, Date value2) {
            addCriterion("completion_date between", value1, value2, "completionDate");
            return (Criteria) this;
        }

        public Criteria andCompletionDateNotBetween(Date value1, Date value2) {
            addCriterion("completion_date not between", value1, value2, "completionDate");
            return (Criteria) this;
        }

        public Criteria andUsedateIsNull() {
            addCriterion("useDate is null");
            return (Criteria) this;
        }

        public Criteria andUsedateIsNotNull() {
            addCriterion("useDate is not null");
            return (Criteria) this;
        }

        public Criteria andUsedateEqualTo(Date value) {
            addCriterion("useDate =", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateNotEqualTo(Date value) {
            addCriterion("useDate <>", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateGreaterThan(Date value) {
            addCriterion("useDate >", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateGreaterThanOrEqualTo(Date value) {
            addCriterion("useDate >=", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateLessThan(Date value) {
            addCriterion("useDate <", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateLessThanOrEqualTo(Date value) {
            addCriterion("useDate <=", value, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateIn(List<Date> values) {
            addCriterion("useDate in", values, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateNotIn(List<Date> values) {
            addCriterion("useDate not in", values, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateBetween(Date value1, Date value2) {
            addCriterion("useDate between", value1, value2, "usedate");
            return (Criteria) this;
        }

        public Criteria andUsedateNotBetween(Date value1, Date value2) {
            addCriterion("useDate not between", value1, value2, "usedate");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateIsNull() {
            addCriterion("storehouse_state is null");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateIsNotNull() {
            addCriterion("storehouse_state is not null");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateEqualTo(Integer value) {
            addCriterion("storehouse_state =", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateNotEqualTo(Integer value) {
            addCriterion("storehouse_state <>", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateGreaterThan(Integer value) {
            addCriterion("storehouse_state >", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateGreaterThanOrEqualTo(Integer value) {
            addCriterion("storehouse_state >=", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateLessThan(Integer value) {
            addCriterion("storehouse_state <", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateLessThanOrEqualTo(Integer value) {
            addCriterion("storehouse_state <=", value, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateIn(List<Integer> values) {
            addCriterion("storehouse_state in", values, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateNotIn(List<Integer> values) {
            addCriterion("storehouse_state not in", values, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_state between", value1, value2, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStorehouseStateNotBetween(Integer value1, Integer value2) {
            addCriterion("storehouse_state not between", value1, value2, "storehouseState");
            return (Criteria) this;
        }

        public Criteria andStoreWayIsNull() {
            addCriterion("store_way is null");
            return (Criteria) this;
        }

        public Criteria andStoreWayIsNotNull() {
            addCriterion("store_way is not null");
            return (Criteria) this;
        }

        public Criteria andStoreWayEqualTo(Integer value) {
            addCriterion("store_way =", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayNotEqualTo(Integer value) {
            addCriterion("store_way <>", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayGreaterThan(Integer value) {
            addCriterion("store_way >", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayGreaterThanOrEqualTo(Integer value) {
            addCriterion("store_way >=", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayLessThan(Integer value) {
            addCriterion("store_way <", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayLessThanOrEqualTo(Integer value) {
            addCriterion("store_way <=", value, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayIn(List<Integer> values) {
            addCriterion("store_way in", values, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayNotIn(List<Integer> values) {
            addCriterion("store_way not in", values, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayBetween(Integer value1, Integer value2) {
            addCriterion("store_way between", value1, value2, "storeWay");
            return (Criteria) this;
        }

        public Criteria andStoreWayNotBetween(Integer value1, Integer value2) {
            addCriterion("store_way not between", value1, value2, "storeWay");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeIsNull() {
            addCriterion("currentType is null");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeIsNotNull() {
            addCriterion("currentType is not null");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeEqualTo(Integer value) {
            addCriterion("currentType =", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeNotEqualTo(Integer value) {
            addCriterion("currentType <>", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeGreaterThan(Integer value) {
            addCriterion("currentType >", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("currentType >=", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeLessThan(Integer value) {
            addCriterion("currentType <", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeLessThanOrEqualTo(Integer value) {
            addCriterion("currentType <=", value, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeIn(List<Integer> values) {
            addCriterion("currentType in", values, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeNotIn(List<Integer> values) {
            addCriterion("currentType not in", values, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeBetween(Integer value1, Integer value2) {
            addCriterion("currentType between", value1, value2, "currenttype");
            return (Criteria) this;
        }

        public Criteria andCurrenttypeNotBetween(Integer value1, Integer value2) {
            addCriterion("currentType not between", value1, value2, "currenttype");
            return (Criteria) this;
        }

        public Criteria andDutystoremanIsNull() {
            addCriterion("dutyStoreman is null");
            return (Criteria) this;
        }

        public Criteria andDutystoremanIsNotNull() {
            addCriterion("dutyStoreman is not null");
            return (Criteria) this;
        }

        public Criteria andDutystoremanEqualTo(String value) {
            addCriterion("dutyStoreman =", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanNotEqualTo(String value) {
            addCriterion("dutyStoreman <>", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanGreaterThan(String value) {
            addCriterion("dutyStoreman >", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanGreaterThanOrEqualTo(String value) {
            addCriterion("dutyStoreman >=", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanLessThan(String value) {
            addCriterion("dutyStoreman <", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanLessThanOrEqualTo(String value) {
            addCriterion("dutyStoreman <=", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanLike(String value) {
            addCriterion("dutyStoreman like", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanNotLike(String value) {
            addCriterion("dutyStoreman not like", value, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanIn(List<String> values) {
            addCriterion("dutyStoreman in", values, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanNotIn(List<String> values) {
            addCriterion("dutyStoreman not in", values, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanBetween(String value1, String value2) {
            addCriterion("dutyStoreman between", value1, value2, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andDutystoremanNotBetween(String value1, String value2) {
            addCriterion("dutyStoreman not between", value1, value2, "dutystoreman");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("remark is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("remark is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("remark =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("remark <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("remark >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("remark >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("remark <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("remark <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("remark like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("remark not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("remark in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("remark not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("remark between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("remark not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andCreatenameIsNull() {
            addCriterion("createName is null");
            return (Criteria) this;
        }

        public Criteria andCreatenameIsNotNull() {
            addCriterion("createName is not null");
            return (Criteria) this;
        }

        public Criteria andCreatenameEqualTo(String value) {
            addCriterion("createName =", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameNotEqualTo(String value) {
            addCriterion("createName <>", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameGreaterThan(String value) {
            addCriterion("createName >", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameGreaterThanOrEqualTo(String value) {
            addCriterion("createName >=", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameLessThan(String value) {
            addCriterion("createName <", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameLessThanOrEqualTo(String value) {
            addCriterion("createName <=", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameLike(String value) {
            addCriterion("createName like", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameNotLike(String value) {
            addCriterion("createName not like", value, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameIn(List<String> values) {
            addCriterion("createName in", values, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameNotIn(List<String> values) {
            addCriterion("createName not in", values, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameBetween(String value1, String value2) {
            addCriterion("createName between", value1, value2, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatenameNotBetween(String value1, String value2) {
            addCriterion("createName not between", value1, value2, "createname");
            return (Criteria) this;
        }

        public Criteria andCreatedateIsNull() {
            addCriterion("createDate is null");
            return (Criteria) this;
        }

        public Criteria andCreatedateIsNotNull() {
            addCriterion("createDate is not null");
            return (Criteria) this;
        }

        public Criteria andCreatedateEqualTo(Date value) {
            addCriterion("createDate =", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateNotEqualTo(Date value) {
            addCriterion("createDate <>", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateGreaterThan(Date value) {
            addCriterion("createDate >", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateGreaterThanOrEqualTo(Date value) {
            addCriterion("createDate >=", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateLessThan(Date value) {
            addCriterion("createDate <", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateLessThanOrEqualTo(Date value) {
            addCriterion("createDate <=", value, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateIn(List<Date> values) {
            addCriterion("createDate in", values, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateNotIn(List<Date> values) {
            addCriterion("createDate not in", values, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateBetween(Date value1, Date value2) {
            addCriterion("createDate between", value1, value2, "createdate");
            return (Criteria) this;
        }

        public Criteria andCreatedateNotBetween(Date value1, Date value2) {
            addCriterion("createDate not between", value1, value2, "createdate");
            return (Criteria) this;
        }

        public Criteria andUpdatenameIsNull() {
            addCriterion("updateName is null");
            return (Criteria) this;
        }

        public Criteria andUpdatenameIsNotNull() {
            addCriterion("updateName is not null");
            return (Criteria) this;
        }

        public Criteria andUpdatenameEqualTo(String value) {
            addCriterion("updateName =", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameNotEqualTo(String value) {
            addCriterion("updateName <>", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameGreaterThan(String value) {
            addCriterion("updateName >", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameGreaterThanOrEqualTo(String value) {
            addCriterion("updateName >=", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameLessThan(String value) {
            addCriterion("updateName <", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameLessThanOrEqualTo(String value) {
            addCriterion("updateName <=", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameLike(String value) {
            addCriterion("updateName like", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameNotLike(String value) {
            addCriterion("updateName not like", value, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameIn(List<String> values) {
            addCriterion("updateName in", values, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameNotIn(List<String> values) {
            addCriterion("updateName not in", values, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameBetween(String value1, String value2) {
            addCriterion("updateName between", value1, value2, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatenameNotBetween(String value1, String value2) {
            addCriterion("updateName not between", value1, value2, "updatename");
            return (Criteria) this;
        }

        public Criteria andUpdatedateIsNull() {
            addCriterion("updateDate is null");
            return (Criteria) this;
        }

        public Criteria andUpdatedateIsNotNull() {
            addCriterion("updateDate is not null");
            return (Criteria) this;
        }

        public Criteria andUpdatedateEqualTo(Date value) {
            addCriterion("updateDate =", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateNotEqualTo(Date value) {
            addCriterion("updateDate <>", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateGreaterThan(Date value) {
            addCriterion("updateDate >", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateGreaterThanOrEqualTo(Date value) {
            addCriterion("updateDate >=", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateLessThan(Date value) {
            addCriterion("updateDate <", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateLessThanOrEqualTo(Date value) {
            addCriterion("updateDate <=", value, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateIn(List<Date> values) {
            addCriterion("updateDate in", values, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateNotIn(List<Date> values) {
            addCriterion("updateDate not in", values, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateBetween(Date value1, Date value2) {
            addCriterion("updateDate between", value1, value2, "updatedate");
            return (Criteria) this;
        }

        public Criteria andUpdatedateNotBetween(Date value1, Date value2) {
            addCriterion("updateDate not between", value1, value2, "updatedate");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusIsNull() {
            addCriterion("working_status is null");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusIsNotNull() {
            addCriterion("working_status is not null");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusEqualTo(Integer value) {
            addCriterion("working_status =", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusNotEqualTo(Integer value) {
            addCriterion("working_status <>", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusGreaterThan(Integer value) {
            addCriterion("working_status >", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("working_status >=", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusLessThan(Integer value) {
            addCriterion("working_status <", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusLessThanOrEqualTo(Integer value) {
            addCriterion("working_status <=", value, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusIn(List<Integer> values) {
            addCriterion("working_status in", values, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusNotIn(List<Integer> values) {
            addCriterion("working_status not in", values, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusBetween(Integer value1, Integer value2) {
            addCriterion("working_status between", value1, value2, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andWorkingStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("working_status not between", value1, value2, "workingStatus");
            return (Criteria) this;
        }

        public Criteria andDelFlagIsNull() {
            addCriterion("del_flag is null");
            return (Criteria) this;
        }

        public Criteria andDelFlagIsNotNull() {
            addCriterion("del_flag is not null");
            return (Criteria) this;
        }

        public Criteria andDelFlagEqualTo(Integer value) {
            addCriterion("del_flag =", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagNotEqualTo(Integer value) {
            addCriterion("del_flag <>", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagGreaterThan(Integer value) {
            addCriterion("del_flag >", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagGreaterThanOrEqualTo(Integer value) {
            addCriterion("del_flag >=", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagLessThan(Integer value) {
            addCriterion("del_flag <", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagLessThanOrEqualTo(Integer value) {
            addCriterion("del_flag <=", value, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagIn(List<Integer> values) {
            addCriterion("del_flag in", values, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagNotIn(List<Integer> values) {
            addCriterion("del_flag not in", values, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagBetween(Integer value1, Integer value2) {
            addCriterion("del_flag between", value1, value2, "delFlag");
            return (Criteria) this;
        }

        public Criteria andDelFlagNotBetween(Integer value1, Integer value2) {
            addCriterion("del_flag not between", value1, value2, "delFlag");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeIsNull() {
            addCriterion("library_type is null");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeIsNotNull() {
            addCriterion("library_type is not null");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeEqualTo(String value) {
            addCriterion("library_type =", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeNotEqualTo(String value) {
            addCriterion("library_type <>", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeGreaterThan(String value) {
            addCriterion("library_type >", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeGreaterThanOrEqualTo(String value) {
            addCriterion("library_type >=", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeLessThan(String value) {
            addCriterion("library_type <", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeLessThanOrEqualTo(String value) {
            addCriterion("library_type <=", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeLike(String value) {
            addCriterion("library_type like", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeNotLike(String value) {
            addCriterion("library_type not like", value, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeIn(List<String> values) {
            addCriterion("library_type in", values, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeNotIn(List<String> values) {
            addCriterion("library_type not in", values, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeBetween(String value1, String value2) {
            addCriterion("library_type between", value1, value2, "libraryType");
            return (Criteria) this;
        }

        public Criteria andLibraryTypeNotBetween(String value1, String value2) {
            addCriterion("library_type not between", value1, value2, "libraryType");
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