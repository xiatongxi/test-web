package com.chinaitop.depot.utils;


import java.io.BufferedInputStream;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;

public class ParameterUtil {

    public static String getSysDateTime(){
        String temp_str="";
        Date dt = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        temp_str=sdf.format(dt);
        System.out.println("获取当前时间"+temp_str);
        return temp_str;
    }

    public static String getDateYMDHMS(Date date) {
        String str = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        str=sdf.format(date);
        System.out.println("获取当前时间"+str);
        return str;
    }

    public static String getSysDate(){
        String temp_str="";
        Date dt = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        temp_str=sdf.format(dt);
        return temp_str;
    }

    public static Date string2datetime(String dateTime){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = dateFormat.parse(dateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
    //判断字符串是否是时间类型
    public static boolean stringIsTime(String dateTime){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        boolean isTime = true;
        try {
            date = dateFormat.parse(dateTime);
        } catch (ParseException e) {
            isTime = false;
        }
        return isTime;
    }
    public static Date string2date(String dateTime){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = dateFormat.parse(dateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static String date2string(Date date){
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        String str=sdf.format(date);
        return str;
    }

    /**
     * 获取指定时间的时间戳
     * @param datatime
     * @return
     */
    public static String getTimeStamp(String datatime){
        long timeStamp = 0;
        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date date = format.parse(datatime);
            timeStamp = date.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return String.valueOf(timeStamp);
    }

    /*
     * 将时间戳转换为时间
     */
    public static String stampToDate(String s){
        String res;
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        long lt = new Long(s);
        Date date = new Date(lt);
        res = simpleDateFormat.format(date);
        return res;
    }

    public static void main(String[] args) {
//        System.out.println(stampToDate("1504689208643"));
//        System.out.println(getTimeStamp(getSysDateTime()));
//        String ip = "([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}";
//        Pattern pattern = Pattern.compile(ip);
//        Matcher matcher = pattern.matcher("172.16.10.150");
//        matcher.matches();
//        //System.out.println(matcher.matches());
//
//        String a = "1.16.10.1";
//        boolean isNum = a.matches(ip);
//        System.out.println(isNum);
    	
    	String a = " a  b   d  ";
    	System.out.println(a);
    	System.out.println(a.replace(" ", ""));
    }
    public static String getBHS(String BHS){
        String[] str = BHS.split(",");
        StringBuffer sb = new StringBuffer();
        for(int i=0;i<str.length;i++){
            sb.append("'").append(str[i]).append("'").append(",");
        }
        String s=sb.toString();
        String t=s.substring(0,s.length()-1);
        return t;
    }

    //判断字段值是为空 不为空返回ture
    public static boolean isnotnull(Object name){
        return (null!=name&&!"".equals(name) && !"null".equals(name) && "null" != name);
    }

    //判断字段值是为空,为空返回ture
    public static boolean isnull(Object name){
        return (null==name || "".equals(name) || "null".equals(name) || "null" == name);
    }

    //判断字段值是相等  相等返回ture
    public static boolean isequal(Object name,Object value){
        if(name==value||name.equals(value)){
            return true;
        }
        return false;
    }

    /**
     * 判断list和str数组是否全等
     * @param list
     * @param str
     * @return
     */
    public static boolean isAllequal(List<String> list,String[] str){
        boolean isbz = true;
        for(int z=0;z<str.length;z++){
            if(!isequal(list.get(z),str[z])){
                isbz = false;
                break;
            }
        }
        return !isbz || !(str.length == list.size());
    }

    //判断字段值是否在某个集合里  在返回ture
    public static boolean isallequal(Object name,String[] value){
        for(int i=0;i<value.length;i++){
            if(name==value[i]||name.equals(value[i])){
                return true;
            }
        }
        return false;
    }

    /**
     * 从properties得到路径
     * @param filePath
     * @return
     */
    public static Properties readProperties(String filePath) {
        Properties props = new Properties();
        try {
            InputStream in = new BufferedInputStream(ParameterUtil.class.getResourceAsStream(filePath));
            props.load(in);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return props;
    }

}
