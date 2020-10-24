package com.chinaitop.depot.system.model;

import java.math.BigDecimal;
import java.util.Date;

public class BasicStorehouse {
    private Integer storehouseId;

    private String uuid;

    private Integer depotId;

    private String depotName;

    private Integer orgId;

    private String orgName;

    private String storehouseCode;

    private String storehouseName;

    private Integer storehouseType;

    private Integer storehouseTypeMx;

    private String architectureType;

    private String storeImg;

    private String ground;

    private Integer wall;

    private String roof;

    private String house;

    private BigDecimal designCapacity;

    private Integer keepingWay;

    private BigDecimal grainHeigth;

    private BigDecimal storeOutsideLength;

    private BigDecimal storeOutsideWidth;

    private BigDecimal storeOutsideHeigth;

    private BigDecimal storeOutsideTopHeigth;

    private BigDecimal outsideSiloDiameter;

    private BigDecimal outerWallArea;

    private BigDecimal deductVolume;

    private BigDecimal length;

    private BigDecimal width;

    private BigDecimal heigth;

    private BigDecimal grainLineHeigth;

    private BigDecimal siloDiameter;

    private BigDecimal binVolume;

    private BigDecimal grainPileVolume;

    private Integer houseDoorNum;

    private String houseDootPosition;

    private BigDecimal houseDoorWidth;

    private BigDecimal houseDoorHeigth;

    private Integer drafttype;

    private String heatinsulationstepRoof;

    private String heatinsulationstepWindow;

    private BigDecimal actualCapacity;

    private Date completionDate;

    private Date usedate;

    private Integer storehouseState;

    private Integer storeWay;

    private Integer currenttype;

    private String dutystoreman;

    private String remark;

    private String createname;

    private Date createdate;

    private String updatename;

    private Date updatedate;

    private Integer workingStatus;

    private Integer delFlag;

    private String libraryType;

    public Integer getStorehouseId() {
        return storehouseId;
    }

    public void setStorehouseId(Integer storehouseId) {
        this.storehouseId = storehouseId;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
    }

    public Integer getDepotId() {
        return depotId;
    }

    public void setDepotId(Integer depotId) {
        this.depotId = depotId;
    }

    public String getDepotName() {
        return depotName;
    }

    public void setDepotName(String depotName) {
        this.depotName = depotName == null ? null : depotName.trim();
    }

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName == null ? null : orgName.trim();
    }

    public String getStorehouseCode() {
        return storehouseCode;
    }

    public void setStorehouseCode(String storehouseCode) {
        this.storehouseCode = storehouseCode == null ? null : storehouseCode.trim();
    }

    public String getStorehouseName() {
        return storehouseName;
    }

    public void setStorehouseName(String storehouseName) {
        this.storehouseName = storehouseName == null ? null : storehouseName.trim();
    }

    public Integer getStorehouseType() {
        return storehouseType;
    }

    public void setStorehouseType(Integer storehouseType) {
        this.storehouseType = storehouseType;
    }

    public Integer getStorehouseTypeMx() {
        return storehouseTypeMx;
    }

    public void setStorehouseTypeMx(Integer storehouseTypeMx) {
        this.storehouseTypeMx = storehouseTypeMx;
    }

    public String getArchitectureType() {
        return architectureType;
    }

    public void setArchitectureType(String architectureType) {
        this.architectureType = architectureType == null ? null : architectureType.trim();
    }

    public String getStoreImg() {
        return storeImg;
    }

    public void setStoreImg(String storeImg) {
        this.storeImg = storeImg == null ? null : storeImg.trim();
    }

    public String getGround() {
        return ground;
    }

    public void setGround(String ground) {
        this.ground = ground == null ? null : ground.trim();
    }

    public Integer getWall() {
        return wall;
    }

    public void setWall(Integer wall) {
        this.wall = wall;
    }

    public String getRoof() {
        return roof;
    }

    public void setRoof(String roof) {
        this.roof = roof == null ? null : roof.trim();
    }

    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house == null ? null : house.trim();
    }

    public BigDecimal getDesignCapacity() {
        return designCapacity;
    }

    public void setDesignCapacity(BigDecimal designCapacity) {
        this.designCapacity = designCapacity;
    }

    public Integer getKeepingWay() {
        return keepingWay;
    }

    public void setKeepingWay(Integer keepingWay) {
        this.keepingWay = keepingWay;
    }

    public BigDecimal getGrainHeigth() {
        return grainHeigth;
    }

    public void setGrainHeigth(BigDecimal grainHeigth) {
        this.grainHeigth = grainHeigth;
    }

    public BigDecimal getStoreOutsideLength() {
        return storeOutsideLength;
    }

    public void setStoreOutsideLength(BigDecimal storeOutsideLength) {
        this.storeOutsideLength = storeOutsideLength;
    }

    public BigDecimal getStoreOutsideWidth() {
        return storeOutsideWidth;
    }

    public void setStoreOutsideWidth(BigDecimal storeOutsideWidth) {
        this.storeOutsideWidth = storeOutsideWidth;
    }

    public BigDecimal getStoreOutsideHeigth() {
        return storeOutsideHeigth;
    }

    public void setStoreOutsideHeigth(BigDecimal storeOutsideHeigth) {
        this.storeOutsideHeigth = storeOutsideHeigth;
    }

    public BigDecimal getStoreOutsideTopHeigth() {
        return storeOutsideTopHeigth;
    }

    public void setStoreOutsideTopHeigth(BigDecimal storeOutsideTopHeigth) {
        this.storeOutsideTopHeigth = storeOutsideTopHeigth;
    }

    public BigDecimal getOutsideSiloDiameter() {
        return outsideSiloDiameter;
    }

    public void setOutsideSiloDiameter(BigDecimal outsideSiloDiameter) {
        this.outsideSiloDiameter = outsideSiloDiameter;
    }

    public BigDecimal getOuterWallArea() {
        return outerWallArea;
    }

    public void setOuterWallArea(BigDecimal outerWallArea) {
        this.outerWallArea = outerWallArea;
    }

    public BigDecimal getDeductVolume() {
        return deductVolume;
    }

    public void setDeductVolume(BigDecimal deductVolume) {
        this.deductVolume = deductVolume;
    }

    public BigDecimal getLength() {
        return length;
    }

    public void setLength(BigDecimal length) {
        this.length = length;
    }

    public BigDecimal getWidth() {
        return width;
    }

    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    public BigDecimal getHeigth() {
        return heigth;
    }

    public void setHeigth(BigDecimal heigth) {
        this.heigth = heigth;
    }

    public BigDecimal getGrainLineHeigth() {
        return grainLineHeigth;
    }

    public void setGrainLineHeigth(BigDecimal grainLineHeigth) {
        this.grainLineHeigth = grainLineHeigth;
    }

    public BigDecimal getSiloDiameter() {
        return siloDiameter;
    }

    public void setSiloDiameter(BigDecimal siloDiameter) {
        this.siloDiameter = siloDiameter;
    }

    public BigDecimal getBinVolume() {
        return binVolume;
    }

    public void setBinVolume(BigDecimal binVolume) {
        this.binVolume = binVolume;
    }

    public BigDecimal getGrainPileVolume() {
        return grainPileVolume;
    }

    public void setGrainPileVolume(BigDecimal grainPileVolume) {
        this.grainPileVolume = grainPileVolume;
    }

    public Integer getHouseDoorNum() {
        return houseDoorNum;
    }

    public void setHouseDoorNum(Integer houseDoorNum) {
        this.houseDoorNum = houseDoorNum;
    }

    public String getHouseDootPosition() {
        return houseDootPosition;
    }

    public void setHouseDootPosition(String houseDootPosition) {
        this.houseDootPosition = houseDootPosition == null ? null : houseDootPosition.trim();
    }

    public BigDecimal getHouseDoorWidth() {
        return houseDoorWidth;
    }

    public void setHouseDoorWidth(BigDecimal houseDoorWidth) {
        this.houseDoorWidth = houseDoorWidth;
    }

    public BigDecimal getHouseDoorHeigth() {
        return houseDoorHeigth;
    }

    public void setHouseDoorHeigth(BigDecimal houseDoorHeigth) {
        this.houseDoorHeigth = houseDoorHeigth;
    }

    public Integer getDrafttype() {
        return drafttype;
    }

    public void setDrafttype(Integer drafttype) {
        this.drafttype = drafttype;
    }

    public String getHeatinsulationstepRoof() {
        return heatinsulationstepRoof;
    }

    public void setHeatinsulationstepRoof(String heatinsulationstepRoof) {
        this.heatinsulationstepRoof = heatinsulationstepRoof == null ? null : heatinsulationstepRoof.trim();
    }

    public String getHeatinsulationstepWindow() {
        return heatinsulationstepWindow;
    }

    public void setHeatinsulationstepWindow(String heatinsulationstepWindow) {
        this.heatinsulationstepWindow = heatinsulationstepWindow == null ? null : heatinsulationstepWindow.trim();
    }

    public BigDecimal getActualCapacity() {
        return actualCapacity;
    }

    public void setActualCapacity(BigDecimal actualCapacity) {
        this.actualCapacity = actualCapacity;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public Date getUsedate() {
        return usedate;
    }

    public void setUsedate(Date usedate) {
        this.usedate = usedate;
    }

    public Integer getStorehouseState() {
        return storehouseState;
    }

    public void setStorehouseState(Integer storehouseState) {
        this.storehouseState = storehouseState;
    }

    public Integer getStoreWay() {
        return storeWay;
    }

    public void setStoreWay(Integer storeWay) {
        this.storeWay = storeWay;
    }

    public Integer getCurrenttype() {
        return currenttype;
    }

    public void setCurrenttype(Integer currenttype) {
        this.currenttype = currenttype;
    }

    public String getDutystoreman() {
        return dutystoreman;
    }

    public void setDutystoreman(String dutystoreman) {
        this.dutystoreman = dutystoreman == null ? null : dutystoreman.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getCreatename() {
        return createname;
    }

    public void setCreatename(String createname) {
        this.createname = createname == null ? null : createname.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public String getUpdatename() {
        return updatename;
    }

    public void setUpdatename(String updatename) {
        this.updatename = updatename == null ? null : updatename.trim();
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public Integer getWorkingStatus() {
        return workingStatus;
    }

    public void setWorkingStatus(Integer workingStatus) {
        this.workingStatus = workingStatus;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    public String getLibraryType() {
        return libraryType;
    }

    public void setLibraryType(String libraryType) {
        this.libraryType = libraryType == null ? null : libraryType.trim();
    }
}