/** @format */

import React, { useEffect, useState } from "react";
import { Empty, Pagination, Spin, Input } from "antd";
import { Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Modal } from "react-bootstrap";
import AddLanguage from "./AddLanguage";
import { useSelector } from "react-redux";
import EditLanguage from "./EditLanguage";
import { Tooltip } from "antd";
import Table from "react-bootstrap/Table";
import { PlusOutlined } from "@ant-design/icons";
import TableSkeleton from "../../../components/Table Skeleton/TableSkeleton";
const { Search } = Input;

const LanguageSetting = () => {
  const [currentPagination, setCurrentPagination] = useState(1);
  const dispatch = useDispatch();
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const { isLoading, isOperatioSuccessfulLanguage, languageList } = useSelector(
    (state) => state.superAdminReducer
  );
  const [bulkSelected, setBulkSelected] = useState([]);
  const [searchkeyword, setSearchKeyword] = useState("");
  const [isEditLanguageOpen, setIsEditLanguageOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isPreviewImageoPne, setIsPreviewImageOpen] = useState();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (isOperatioSuccessfulLanguage) {
      dispatch({
        type: "GET_ALL_LANGUAGE_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          ExternalFilter: { Id: "", Name: "" },
          SearhcKeywords: searchkeyword,
        },
      });
      setIsEditLanguageOpen(false);
      setIsAddLanguageOpen(false);
      setBulkSelected([]);
    }
  }, [isOperatioSuccessfulLanguage]);
  useEffect(() => {
    if (searchkeyword) {
      const searchTimeout = setTimeout(() => {
        dispatch({
          type: "GET_ALL_LANGUAGE_REQUEST",
          payload: {
            Page: 1,
            pageSize: 10,
            ExternalFilter: { Id: "", Name: "" },
            SearchKeywords: searchkeyword,
          },
        });
      }, 500);
      return () => {
        clearTimeout(searchTimeout);
      };
    } else {
      dispatch({
        type: "GET_ALL_LANGUAGE_REQUEST",
        payload: {
          Page: 1,
          pageSize: 10,
          ExternalFilter: { Id: "", Name: "" },
          SearchKeywords: searchkeyword,
        },
      });
    }
  }, [searchkeyword]);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);

    dispatch({
      type: "GET_ALL_LANGUAGE_REQUEST",
      payload: {
        Page: current,
        pageSize: pageSize,
        ExternalFilter: { Id: "", Name: "" },
        SearhcKeywords: searchkeyword,
      },
    });
  }

  return (
    <>
      <Modal
        show={isEditLanguageOpen}
        onHide={() => {
          setIsEditLanguageOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Edit Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditLanguage
            setIsEditLanguageOpen={setIsEditLanguageOpen}
            activeItem={activeItem}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={isAddLanguageOpen}
        onHide={() => {
          setIsAddLanguageOpen(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "20px" }}>Add Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddLanguage setIsAddLanguageOpen={setIsAddLanguageOpen} />
        </Modal.Body>
      </Modal>

      <div className="card">
        <div className="card-body">
          <div className="table-body">
            <div className="table-responsive">
              <div
                style={{
                  display: "flex",
                  margin: "0",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Button
                    icon={<PlusOutlined />}
                    style={{
                      background: "#00205A",
                      color: "white",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setIsAddLanguageOpen(true);
                    }}
                  >
                    Add Language
                  </Button>
                </div>
                <Search
                  style={{ width: "28%" }}
                  placeholder="Search For Language"
                  onSearch={() => {}}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                  enterButton="Search"
                />
              </div>
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <Table bordered hover className="table-banner">
                  <thead>
                    <tr style={{ background: "#EFEFEE" }}>
                      <th>Language</th>
                      <th>English</th>
                      <th>Fields</th>
                      <th>Translated</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {languageList?.data?.length > 0 ? (
                      languageList?.data?.map((language) => {
                        return (
                          <tr key={language.id}>
                            <td>{language.language}</td>
                            <td>{language.english}</td>
                            <td>{language.field}</td>

                            <td>{language.translated}</td>

                            <td>
                              <Tooltip title="Edit Banner">
                                <a
                                  className="btn btn-info btn-sm"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="left"
                                  onClick={(e) => {
                                    setActiveItem(language);
                                    setIsEditLanguageOpen(true);
                                  }}
                                  style={{ marginRight: "5px" }}
                                  data-bs-original-title="Edit"
                                >
                                  <i
                                    className="fas fa-edit"
                                    aria-hidden="true"
                                  />
                                </a>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td align="center" colSpan={7}>
                          {" "}
                          No Records Found !
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </div>
            <div className="company_footer d-flex justify-content-end mt-3">
              <Pagination
                total={languageList?.total ? languageList?.total : 2}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={1}
                onChange={onShowSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSetting;
