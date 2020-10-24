"use strict";
angular.module('app.intelligent').controller("exportExcel", function ($scope, $state, $rootScope, $stateParams, $uibModal, APP_CONFIG, Excel, $timeout) {
    // Demo
    /*$scope.exportToExcel = function (tableId) {
        var exportHref = Excel.tableToExcel(tableId, 'worksheetName');
        $timeout(function () {
            location.href = exportHref;
        }, 500);
    };*/

})

.factory('Excel', function () {
    // 2003xls: data:application/vnd.ms-excel
    // 2007xlsx: data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
        return window.btoa(window.unescape(encodeURIComponent(s)));
    };
    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = window.$(tableId),
                ctx = {worksheet: worksheetName, table: table.html()},
                href = uri + base64(format(template, ctx));
            return href;
        }
    };

})

.factory('Word', function () {
    // docx: data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;
    // doc: data:application/msword;
    var uri = 'data:application/msword;base64,';
    var template = '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function (s) {
        return window.btoa(window.unescape(encodeURIComponent(s)));
    };
    var format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    return {
        tableToWord: function (tableId, worksheetName) {
            var table = window.$(tableId),
                ctx = {worksheet: worksheetName, table: table.html()},
                href = uri + base64(format(template, ctx));
            return href;
        }
    };

});
