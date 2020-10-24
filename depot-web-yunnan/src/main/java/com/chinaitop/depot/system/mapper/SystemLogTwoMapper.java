package com.chinaitop.depot.system.mapper;

import com.chinaitop.depot.system.model.SystemLogTwo;
import com.chinaitop.depot.system.model.SystemLogTwoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SystemLogTwoMapper {
    int countByExample(SystemLogTwoExample example);

    int deleteByExample(SystemLogTwoExample example);

    int insert(SystemLogTwo record);

    int insertSelective(SystemLogTwo record);

    List<SystemLogTwo> selectByExample(SystemLogTwoExample example);

    int updateByExampleSelective(@Param("record") SystemLogTwo record, @Param("example") SystemLogTwoExample example);

    int updateByExample(@Param("record") SystemLogTwo record, @Param("example") SystemLogTwoExample example);
}