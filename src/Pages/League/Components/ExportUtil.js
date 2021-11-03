import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTableHeaders, TableHeaders } from "../../../redux/modules/tablevalue";
import { useDetectOutsideClick } from "../../../Components/SelectFilter/useDetectOustsideClick";
import * as clipboard from 'clipboard-polyfill/text';
import XLSX from "xlsx";
import timeFormat from "../../../lib/timeFormat";

const ExportUtil = ({ filename = "none", tableid }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const tblHeaders = useRef([]);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dispatch = useDispatch();
  const tblvalue = useSelector((state) => state.TableReducer);

  const getTableHeaders = () => {
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

  function tabledata(type) {
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

  function tableData2(tableName) {
    let ws = XLSX.utils.table_to_sheet(document.getElementById(tableid), { sheet: tableName, raw: true });
    let range = XLSX.utils.decode_range(ws['!ref']);
    let result = [];
    let row;
    let rowNum;
    let colNum;
    let selectedCol = [];

    for (let i = 0; i < tblHeaders.current.length; i++) {
      for (let select of tblvalue.headers) {
        if (select === tblHeaders.current[i]) {
          selectedCol.push(i);
          break;
        }
      }
    }

    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        if (selectedCol.includes(colNum) === false) {
          continue;
        }
        let nextCell = ws[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
        if (typeof nextCell === 'undefined') {
          row.push(void 0);
        } else {
          //row.push(nextCell.w);
          row.push(nextCell.v);
        }
      }
      result.push(row);
    }

    return result
  }

  const exportCSV = (tableName, selectedCol) => {

    let resultArray = tableData2(filename, selectedCol);
    let wa = XLSX.utils.aoa_to_sheet(resultArray);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wa, tableName);
    XLSX.writeFile(wb, (timeFormat.nowTime() + tableName + '.csv'));
  }

  const exportXlsx = (tableName, selectedCol) => {
    let resultArray = tableData2(filename, selectedCol);
    let wa = XLSX.utils.aoa_to_sheet(resultArray);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wa, tableName);
    XLSX.writeFile(wb, (timeFormat.nowTime() + tableName + '.xlsx'));
  }

  const copyClipboard = () => {
    clipboard.writeText(tabledata('clipboard')).then(
      function () {
        console.log("success!");
      },
      function () {
        console.log("error!");
      }
    );
  }



  return (
    <>
      <DropDown>
        <div className="menu-container">
          <button
            onClick={() => {
              setIsActive(!isActive);
              getTableHeaders();
            }}
            className="menu-trigger"
          >
            <span className="Label">Export</span>
            <img
              className="ArrowIcon"
              src="Images/btn_view_detail.png"
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
                exportCSV(filename, tblvalue.headers);
                setIsActive(false);
              }}>
                CSV
              </button>
              <button onClick={() => {
                exportXlsx(filename, tblvalue.headers);
                setIsActive(false);
              }}>
                XLSX
              </button>
            </div>
          </nav>
        </div>
      </DropDown >
      <ExportButton onClick={() => {
        copyClipboard();
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
  height: 33px;
  width: 70px;
  line-height: 30px;  
  margin-top: -11.5px;
  margin-right: 5px;
  padding: 0 10px;
  background-color: #5942ba;
  border-radius: 3px;
  border: solid 1px #000;
  align-items: center;
  text-align: center;
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
  width: 100px;
  float: right;
  line-height: 30px;  
  margin-top: -11.5px;
  margin-right: 20px;
  padding: 0 10px;
  display: inline-block;

  img {
    margin-left: 10px;
    transform:rotate(90deg);
  }

  .menu-container {
    position: relative;
    display: inline-block;
    justify-content: center;
    align-items: center;
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    width: 100px;
    height: 33px;
    margin: 0px;
    padding: 5px 11px 4px;
    border-radius: 3px;
    border: solid 1px;
    background-color: #5942ba;
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
    left: 110px;
    width: 144px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-20px);
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