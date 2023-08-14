/** @format */

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Pagination, Popconfirm, Spin, Switch, Tabs } from "antd";
import { Input } from "antd";
import TableSkeleton from "../../components/Table Skeleton/TableSkeleton";
import AssignCustomer from "./AssignCustomer";
import Group from "./Group";
import Voucher from "./Voucher";
import AssignVoucherToCustomer from "./AssignVoucherToCustomer";
function GroupVoucher({ setIsGroupVoucherModalVisible, setSizeFullModal }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [bulkSelected, setBulkSelected] = useState([]);
  const [activeKey, setActiveKey] = useState(1);

  const {
    isLoading,
    addGroupLoading,
    voucherGroup,
    isOperatioSuccessful,
    editData,
    isEditSuccess,
    deleteVoucherGroupLoading,
  } = useSelector((state) => state.loyaltyReducer);
  const bulkDeleteHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_VOUCHER_GROUP_REQUEST",
      payload: [...bulkSelected],
    });
  };
  useEffect(() => {
    dispatch({
      type: "GET_VOUCHER_GROUP_REQUEST",
      payload: {
        Page: 1,
        PageSize: 5,
        SearchKeywords: "",
        ExternalFilter: {},
      },
    });
    setBulkSelected([]);
  }, [isOperatioSuccessful]);
  useEffect(() => {
    if (isOperatioSuccessful) {
      form.resetFields();
      setBulkSelected([]);
      if (editData?.id) {
        dispatch({
          type: "RESET_EDIT_DATA",
        });
      }
      dispatch({
        type: "GET_ASSIGN_GROUP_SECTION_LIST_REQUEST",
      });
    }
    if (isEditSuccess) {
      form.resetFields();
      setBulkSelected([]);
    }
  }, [isOperatioSuccessful, isEditSuccess]);
  const editCategoryTypeHandler = (id) => {
    dispatch({
      type: "EDIT_VOUCHER_GROUP_REQUEST",
      payload: id,
    });
  };
  const deleteCategoryTypeHandler = (id, name) => {
    dispatch({
      type: "DELETE_VOUCHER_GROUP_REQUEST",
      payload: [
        {
          Id: id,
          Name: name,
        },
      ],
    });
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const addVoucherGroupHandler = (values) => {
    dispatch({
      type: "ADD_VOUCHER_GROUP_REQUEST",
      payload: [
        {
          Id: editData?.id ? editData.id : "",
          Name: values.groupName,
          isActive: values.isActive,
        },
      ],
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_VOUCHER_GROUP_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
      },
    });
  }
  return (
    <>
      <Tabs
        onChange={(key) => {
          setActiveKey(key);
        }}
        activeKey={activeKey}
        type="card"
        title="dsa"
        items={[
          {
            label: `Issue Voucher to Customer`,
            key: 1,
            children: <AssignVoucherToCustomer />,
          },
          {
            label: `Issue Voucher to Group`,
            key: 2,
            children: (
              <>
                <Group
                  setSizeFullModal={setSizeFullModal}
                  setIsGroupVoucherModalVisible={setIsGroupVoucherModalVisible}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
}

export default GroupVoucher;
