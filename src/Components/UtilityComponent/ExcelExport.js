/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useRef } from "react";
// 리덕스 상태관련
import { useSelector, useDispatch } from "react-redux";
import { setTableHeaders, TableHeaders } from "../../redux/modules/tablevalue";
// 클립보드 & 엑셀 데이터 export 관련
import * as clipboard from "clipboard-polyfill/text";
import XLSX from "xlsx";
import timeFormat from "../../lib/timeFormat";
// UI 관련
import styled from "@emotion/styled/macro";
import { useTranslation } from "react-i18next";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
// 모달관련
import { useModal } from "../../Hooks/index";
import { modalList } from "../../Components/Modals/Modals";

const ExportUtil = ({ filename = "none", tableid }) => {
  // ref
  const dropdownRef = useRef(null);
  const tblHeaders = useRef([]);
  // hook
  const { t } = useTranslation();
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
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
    const regex = /\n/gi; // 줄바꿈 제거 정규식

    for (let rowCnt = 0; rowCnt < table.rows.length; rowCnt++) {
      let rowData = table.rows[rowCnt].cells;
      for (let colCnt = 0; colCnt < rowData.length; colCnt++) {
        let columnData = rowData[colCnt].innerText;
        if (columnData == null || columnData.length === 0) {
          columnData = "".replace(/"/g, '""');
        } else {
          columnData = columnData
            .toString()
            .replace(/"/g, '""')
            .replace(regex, ""); // escape double quotes
        }
        // console.log(result);
        result =
          type === "csv"
            ? result + '"' + columnData + '",'
            : result + columnData + "\t";
      }
      result = result.substring(0, result.length - 1);
      result = result + "\r\n";
    }
    result = result.substring(0, result.length - 1);

    return result;
  }

  function tableData2(tableName) {
    let ws = XLSX.utils.table_to_sheet(document.getElementById(tableid), {
      sheet: tableName,
      raw: true,
    });
    let range = XLSX.utils.decode_range(ws["!ref"]);
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
        if (typeof nextCell === "undefined") {
          row.push(void 0);
        } else {
          //row.push(nextCell.w);
          row.push(nextCell.v);
        }
      }
      result.push(row);
    }

    return result;
  }

  const exportCSV = (tableName, selectedCol) => {
    let resultArray = tableData2(filename, selectedCol);
    let wa = XLSX.utils.aoa_to_sheet(resultArray);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wa, tableName);
    XLSX.writeFile(wb, timeFormat.nowTime() + tableName + ".csv");
  };

  const exportXlsx = (tableName, selectedCol) => {
    let resultArray = tableData2(filename, selectedCol);
    let wa = XLSX.utils.aoa_to_sheet(resultArray);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wa, tableName);
    XLSX.writeFile(wb, timeFormat.nowTime() + tableName + ".xlsx");
  };

  const copyClipboard = () => {
    clipboard.writeText(tabledata("clipboard")).then(
      () => openModal(modalList.alert, { text: t("alert.desc.copy_y") }),
      () => openModal(modalList.alert, { text: t("alert.desc.copy_n") })
    );
  };

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
              className="arrow-icon"
              src="Images/btn_view_detail.png"
              alt="arrowIcon"
            />
          </button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
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
                );
              })}
            </ul>
            <ExportFile changeColor={tblvalue.headers.length > 0}>
              <button
                onClick={() => {
                  tblvalue.headers.length > 0 &&
                    exportCSV(filename, tblvalue.headers);
                  tblvalue.headers.length > 0 && setIsActive(false);
                }}
              >
                <img
                  className="download-icon"
                  src="Images/ic_download.png"
                  alt="DownloadIcon"
                />
                CSV
              </button>
              <button
                onClick={() => {
                  tblvalue.headers.length > 0 &&
                    exportXlsx(filename, tblvalue.headers);
                  tblvalue.headers.length > 0 && setIsActive(false);
                }}
              >
                <img
                  className="download-icon"
                  src="Images/ic_download.png"
                  alt="DownloadIcon"
                />
                XLSX
              </button>
            </ExportFile>
          </nav>
        </div>
      </DropDown>
      <ExportButton
        onClick={() => {
          copyClipboard();
        }}
      >
        Copy
      </ExportButton>
    </>
  );
};

export default React.memo(ExportUtil);

const ExportButton = styled.div`
  float: right;
  color: #fff;
  cursor: pointer;
  height: 30px;
  width: 74px;
  line-height: 30px;
  margin-top: -8.9px;
  margin-right: 0px;
  padding: 4.5px 10px 0px 10px;
  background-color: #5942ba;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  font-family: "Spoqa Han Sans";
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

const Selected = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  margin: 5px 0;
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
    width: 24px;
    height: 24px;

    background-clip: content-box;
    background: url("/Images/btn_check_off.svg") no-repeat;
    margin-right: 8px;

    &:checked {
      background-color: #5942ba;
      border: #5942ba;
      border-radius: 2px;
      background: url("/Images/btn_check_on.svg") no-repeat;
      float: right;
    }

    &:focus {
      outline: none !important;
    }
  }

  :hover {
    width: 165px;
    border-radius: 10px;
    background-color: #3a3745;
  }
`;

const DropDown = styled.div`
  width: 78px;
  height: 30px;
  float: right;
  line-height: 30px;
  margin-top: -9.5px;
  margin-right: 20px;
  padding: 0 10px;
  display: inline-block;

  .menu-container {
    position: relative;
    display: inline-block;
    justify-content: center;
    align-items: center;

    .arrow-icon {
      transform: rotate(90deg);
    }
  }

  .menu-trigger {
    display: flex;
    align-items: center;
    width: 78px;
    height: 30px;
    margin: 0px;
    padding: 5px 0px 2px 5px;
    border-radius: 10px;
    background-color: #5942ba;
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    img {
      margin-left: -10px;
    }
  }

  .menu-trigger:hover {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  }

  .Label {
    //font-family: NotoSansKR, Apple SD Gothic Neo;
    letter-spacing: -0.6px;
    text-align: left;
    color: rgb(255, 255, 255);
    margin: 0 0 4px 11.4px;
    /* padding-right: 29.6px; */
    width: 140px;
  }

  .menu {
    background: rgb(35, 33, 42);
    position: absolute;
    top: 20px;
    left: 70px;
    border-radius: 10px;
    box-shadow: 3px 9px 6px 0 rgba(0, 0, 0, 0.16);
    visibility: hidden;
    transform: translateX(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    width: 210px;
    z-index: 9999;
  }

  .menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 25px 0 10px 20px;
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
`;

const ExportFile = styled.div`
  margin: 15px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    width: 76px;
    height: 30px;
    margin: 0 5px;
    padding: 1px 2px;
    border-radius: 10px;
    background-color: ${(props) => (props.changeColor ? `#5942ba` : `#484655`)};
    color: #fff;
    padding-right: 7px;
    .download-icon {
      width: 18px;
      height: 18px;
      transform: rotate(180 deg);
      object-fit: contain;
      margin-top: 5px;
    }
    :hover {
      background-color: ${(props) =>
        props.changeColor ? `#5942ba` : `#484655`};
    }
  }
`;
