"use strict";

angular.module('app.business').service("commonUtilService", function($http, $q, APP_CONFIG) {
    /*---------------js 两个数加 ------------------------------*/
    this.accAdd = function(arg1, arg2) {
        if (arg1 == '' || arg1 == null || arg1 == undefined) {
            arg1 = 0;
        }
        if (arg2 == '' || arg2 == null || arg2 == undefined) {
            arg2 = 0;
        }
        var r1 = 0, r2 = 0, m;
        try {r1 = arg1.toString().split(".")[1].length;} catch(e) {}
        try {r2 = arg2.toString().split(".")[1].length;} catch(e) {}
        // 相加，小数位数为两个数中小数最长的.
        m=Math.pow(10,Math.max(r1,r2));
        return (arg1*m+arg2*m)/m;
    }
    /*---------------js 两个数减 ------------------------------*/
    this.accSub = function(arg1, arg2) {
        if (arg1 == '' || arg1 == null || arg1 == undefined) {
            arg1 = 0;
        }
        if (arg2 == '' || arg2 == null || arg2 == undefined) {
            arg2 = 0;
        }
        var r1 = 0, r2 = 0, m, n;
        try {r1=arg1.toString().split(".")[1].length; } catch(e) {}
        try {r2=arg2.toString().split(".")[1].length; } catch(e) {}
        // 相加，小数位数为两个数中小数最长的.
        m=Math.pow(10,Math.max(r1,r2));
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(n);
    }
    /*---------------js 两个数相乘 ------------------------------*/
    this.accMul = function(num1, num2) {
        if (num1 == '' || num1 == null || num1 == undefined) {
            num1 = 0;
        }
        if (num2 == '' || num2 == null || num2 == undefined) {
            num2 = 0;
        }
        var m = 0;
        var n = 0;
        var s1 = num1.toString();
        var s2 = num2.toString();
        // 相乘，小数位数为两个数小数之和.
        try { m = s1.split(".")[1].length; } catch (e) {};
        try { n = s2.split(".")[1].length; } catch (e) {};
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m+n);
    }
    /*---------------js 两个数除 ------------------------------*/
    this.accDiv = function(arg1, arg2) {
        if (arg1 == '' || arg1 == null || arg1 == undefined) {
            arg1 = 0;
        }
        if (arg2 == '' || arg2 == null || arg2 == undefined) {
            arg2 = 0;
        }
        var t1=0,t2=0,r1,r2;
        try {t1=arg1.toString().split(".")[1].length;} catch (e) {}
        try {t2=arg2.toString().split(".")[1].length;} catch (e) {}
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        // 相除，小数位数为两个数小数之差.
        return this.accMul((r1/r2), Math.pow(10,t2-t1));
    }
    /*---------------js 数字转大写金额 单位(元 角分)-----------------------*/
    this.JEDX = function(num) {
        if (isNaN(num)) {
            return "无效数值！";
        }
        var strPrefix="";
        if(num < 0) {
            strPrefix ="(负)";
        }
        num = Math.abs(num);
        if (num >= 1000000000000) {
            return "无效数值！";
        }
        var strOutput = ""; 
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'; 
        num += "00"; 
        var intPos = num.indexOf('.'); 
        if (intPos >= 0) {
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2); 
        }
        strUnit = strUnit.substr(strUnit.length - num.length); 
        for (var i=0; i < num.length; i++) {
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1); 
        }
        return strPrefix + strOutput.replace(/零角零分$/, '整').replace(/零分$/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元"); 
    };

})
