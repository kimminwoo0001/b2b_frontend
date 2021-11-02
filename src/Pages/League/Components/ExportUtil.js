import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTableHeaders, TableHeaders } from "../../../redux/modules/tablevalue";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import * as clipboard from 'clipboard-polyfill/text';
import XLSX from "xlsx";
import timeFormat from "../../../lib/timeFormat";


function tabledata(tableid, type) {
  const BOM = "\uFEFF"; //바이트 순서 표식
  let result = BOM;

  const table = document.getElementById(tableid);
  for (let rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
    let rowData = table.rows[rowCnt].cells;
    for (let colCnt = 0; colCnt < rowData.length; colCnt++) {
      let columnData = rowData[colCnt].innerText;
      if (columnData == null || columnData.length === 0) {
        columnData = "".replace(/"/g, '""');
      }
      else {
        columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
      }
      console.log(result);
      result = type === 'csv' ? result + '"' + columnData + '",' : result + columnData + '\t';
    }
    result = result.substring(0, result.length - 1);
    result = result + "\r\n";
  }
  result = result.substring(0, result.length - 1);

  return result;
}

const exportCSV = (filename = "none", tableid, tblData) => {

  filename = timeFormat.nowTime() + filename + ".csv";
  let csvString = tabledata(tableid, "csv");
  // IE 10, 11, Edge Run
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {

    const blob = new Blob([decodeURIComponent(csvString)], {
      type: 'text/csv;charset=utf8'
    });
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    // HTML5 Blob
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
    const csvUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', csvUrl);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click()
    a.remove();
  } else {
    // Data URI
    const csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf8' });
    const csvUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', csvData);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click()
    a.remove();
  }
}

const exportXlsx = (tableName, tableid, tblData) => {
  var wb = XLSX.utils.table_to_book(document.getElementById(tableid), { sheet: tableName, raw: true });
  XLSX.writeFile(wb, (timeFormat.nowTime() + tableName + '.xlsx'));
}

const copyClipboard = (tableid) => {
  clipboard.writeText(tabledata(tableid, 'clipboard')).then(
    function () {
      console.log("success!");
    },
    function () {
      console.log("error!");
    }
  );
}




const ExportUtil = ({ filename = "none", tableid }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const tblHeaders = useRef([]);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dispatch = useDispatch();
  const tblvalue = useSelector((state) => state.TableReducer);

  const getTableHeaders = (tableid) => {
    const table = document.getElementById(tableid);
    const rowData = table.rows[0].cells;
    let result = [];

    for (let colCnt = 0; colCnt < rowData.length; colCnt++) {
      let columnData = rowData[colCnt].innerText;
      if (columnData !== null && columnData.length !== 0) {
        columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
        result.push(columnData);
      }
    }

    tblHeaders.current = result;
    dispatch(setTableHeaders(result));
  };

  return (
    <>
      <DropDown>
        <div className="menu-container">
          <button
            onClick={() => {
              setIsActive(!isActive);
              getTableHeaders(tableid);
            }}
            className="menu-trigger"
          >
            <span className="Label">Export</span>
            <img
              className="ArrowIcon"
              src="Images/ico-filter-arrow.png"
              alt="arrowIcon"
            />
          </button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <header>Choose Columns</header>
            {console.log(tblvalue)}
            <ul>
              {tblHeaders.current.map((header, idx) => {
                return (
                  <Selected
                    key={idx}
                    isChecked={
                      tblvalue.headers?.includes(header) ? true : false
                    }
                    onClick={() => {
                      dispatch(TableHeaders(header));
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={
                        tblvalue.headers?.includes(header) ? true : false
                      }
                      readOnly
                    />
                    &nbsp;{header}
                  </Selected>
                )
              })}
            </ul>
            <div className="export-file">
              <button onClick={() => {
                exportCSV(filename, tableid, tblvalue.headers);
                setIsActive(false);
              }}>
                CSV
              </button>
              <button onClick={() => {
                exportXlsx(filename, tableid, tblvalue.headers);
                setIsActive(false);
              }}>
                XLSX
              </button>
            </div>
          </nav>
        </div>
      </DropDown >
      <ExportButton onClick={() => {
        copyClipboard("pickTable");
      }}>
        Copy
      </ExportButton>
    </>
  )
}

export default React.memo(
  ExportUtil
);

const ExportButton = styled.div`
  display: inline-block;
  font-weight: normal;
  float: right;
  color: #fff;
  cursor: pointer;
  height: 30px;
  line-height: 30px;  
  margin-top: -10px;
  margin-right: 5px;
  padding: 0 10px;
  background-color: #5942ba;
  border-radius: 3px;
`;

const Selected = styled.div`
  display: flex;
  align-items: center;
  padding: 4.5px 12px;
  width: 100%;
  height: 25px;
  color: #84818e;
  cursor: pointer;
  ${(props) =>
    props.isChecked &&
    css`
      color: rgb(255, 255, 255);
      background-color: rgb(35, 34, 43);
    `}
  > .Version {
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
  }
  > input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    display: inline-block;
    width: 12px;
    height: 12px;

    background-clip: content-box;
    border: 1.5px solid rgb(72, 70, 85);
    border-radius: 2px;
    background-color: transparent;

    margin-right: 8px;

    &:checked {
      background-color: #f04545;
      border: #f04545;
      border-radius: 2px;
      background: url("/Images/check.svg") #f04545 no-repeat 2.5px 4px/5.5px
        4.5px;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }
`;

const DropDown = styled.div`
  width: 140px;
  float: right;
  line-height: 30px;  
  margin-top: -10px;
  margin-right: 20px;
  padding: 0 10px;
  display: inline-block;

  .menu-container {
    position: relative;
    display: inline-block;
    justify-content: center;
    align-items: center;
    
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    width: 144px;
    height: 33px;
    margin: 0px;
    padding: 5px 11px 4px;
    border-radius: 16px;
    border: solid 1px #3a3745;
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }



  header {
    padding: 0px 10px;
    border: solid 1px;
    color: #fff;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 14px;
    text-align: center;
  }

  .Label {
    //font-family: NotoSansKR, Apple SD Gothic Neo;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 0 0px 0 11.4px;
    /* padding-right: 29.6px; */
    width: 140px;
  }


  .menu {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 0px;
    left: 150px;
    width: 144px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
   
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: solid 1px;
    color: #fff;
  }

  .menu li {
    text-decoration: none;
    padding: 15px 20px;
    display: block;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 11px;
    letter-spacing: -0.55px;
    text-align: left;
    color: rgb(255, 255, 255);
    cursor: pointer;
    :hover {
      background-color: rgb(60, 58, 72);
    }
  }

  .export-file {
    border: solid 1px;
    color: #fff; 
    button {
      color: #fff;
      padding: 10px;
      width: 50%;
      :hover {
        background-color: rgb(60, 58, 72);
      }
    }
  }
`;