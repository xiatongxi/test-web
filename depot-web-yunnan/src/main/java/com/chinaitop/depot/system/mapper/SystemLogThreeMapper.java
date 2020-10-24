package com.chinaitop.depot.system.mapper;

import com.chinaitop.depot.system.model.SystemLogThree;
import com.chinaitop.depot.system.model.SystemLogThreeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SystemLogThreeMapper {
    int countByExample(SystemLogThreeExample example);

    int deleteByExample(SystemLogThreeExample example);

    int insert(SystemLogThree record);

    int insertSelective(SystemLogThree record);

    List<SystemLogThree> selectByExample(SystemLogThreeExample example);

    int updateByExampleSelective(@Param("record") SystemLogThree record, @Param("example") SystemLogThreeExample example);

    int updateByExample(@Param("record") SystemLogThree record, @Param("example") SystemLogThreeExample example);
}