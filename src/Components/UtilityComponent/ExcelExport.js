import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setTableHeaders, TableHeaders } from "../../redux/modules/tablevalue";
import { useDetectOutsideClick } from "../SelectFilter/useDetectOustsideClick";
import * as clipboard from "clipboard-polyfill/text";
import XLSX from "xlsx";
import timeFormat from "../../lib/timeFormat";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.75)",
    border: "1px solid rgba(0, 0, 0, 0.75)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px",
  },
};

const ExportUtil = ({ filename = "none", tableid }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const tblHeaders = useRef([]);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dispatch = useDispatch();
  const tblvalue = useSelector((state) => state.TableReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

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
        } else {
          columnData = columnData.toString().replace(/"/g, '""'); // escape double quotes
        }
        console.log(result);
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
      function () {
        setIsCopy(true);
        setIsOpen(true);
      },
      function () {
        setIsCopy(false);
        setIsOpen(true);
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <ModalDetail>
            {isCopy ? `${t("alert.desc.copy_y")}` : `${t("alert.desc.copy_n")}`}
          </ModalDetail>
          <ModalClose>
            <button onClick={() => setIsOpen(false)}>
              {t("alert.label.confirm")}
            </button>
          </ModalClose>
        </ModalWrapper>
      </Modal>
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
            <div className="export-file">
              <button
                onClick={() => {
                  exportCSV(filename, tblvalue.headers);
                  setIsActive(false);
                }}
              >
                CSV
              </button>
              <button
                onClick={() => {
                  exportXlsx(filename, tblvalue.headers);
                  setIsActive(false);
                }}
              >
                XLSX
              </button>
            </div>
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

  img {
    margin-left: 10px;
    transform: rotate(90deg);
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
    width: 78px;
    height: 30px;
    margin: 0px;
    padding: 0px 0px 2px 5px;
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
    top: 20px;
    left: 70px;
    border-radius: 10px;
    box-shadow: 3px 9px 6px 0 rgba(0, 0, 0, 0.16);
    visibility: hidden;
    transform: translateX(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    width: 210px;
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

  .export-file {
    color: #fff;
    button {
      width: 76px;
      height: 30px;
      // margin: 20px 94px 0 0;
      padding: 6px 16px;
      border-radius: 10px;
      width: 50%;
      background-color: #5942ba;
      :hover {
        background-color: rgb(60, 58, 72);
      }
    }
  }
`;

const ModalWrapper = styled.div`
  width: 500px;
  height: 207px;
  margin: 10px 0 0;
  padding: 30px 0 20px;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0 rgba(4, 0, 0, 0.4);
  background-color: #2f2d38;
  overflow-y: hidden;
`;

const ModalDetail = styled.div`
  width: 420px;
  height: 75px;
  margin: 0 40px 20px;
  font-family: SpoqaHanSansNeo;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const ModalClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 79px;
  button {
    width: 180px;
    height: 42px;
    margin: 0 0px 0 0;
    padding: 0px 0px;
    border-radius: 16px;
    background-color: #5942ba;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: center;
    color: #fff;
  }
`;
