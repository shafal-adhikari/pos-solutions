import { Empty, Popconfirm, Spin } from "antd";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
import { Pagination } from "antd";

function SetMenuList({ showAdd, setShowAdd, isEdit, setIsEdit }) {
  const dispatch = useDispatch();

  const { allSetMenus, totalSetMenus, isLoading, addSuccess, deleteSuccess } =
    useSelector((state) => state.inventoryReducer);
  useEffect(() => {
    dispatch({
      type: "GET_ALL_SET_MENU_REQUEST",
      payload: {
        Page: 1,
        PageSize: 12,
        ExternalFilter: { SearchKeywords: "" },
      },
    });
  }, [addSuccess, deleteSuccess]);
  const deleteSetMenu = (id, name) => {
    dispatch({
      type: "DELETE_SETMENU_REQUEST",
      payload: [{ id, name }],
    });
  };
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_SET_MENU_REQUEST",
      payload: {
        Page: 1,
        PageSize: 12,
        ExternalFilter: { SearchKeywords: "" },
      },
    });
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="table_card d-flex justify-content-between align-items-center">
          <div className="table_search">
            <h6 className="fw-bold">All Set Menu</h6>
          </div>
          <div className=" mb-3">
            <div className="vendor_con">
              <a
                onClick={() => {
                  setIsEdit(false);
                  setShowAdd(true);
                }}
                className="btn btn-primary all_btn rounded-0"
              >
                <i className="fas fa-plus " />
                Add New Set menu
              </a>
            </div>
          </div>
        </div>
        <div className="recentstores newheight pt-50">
          {isLoading ? (
            <div className="row ">
              <ProductCardSkeleton />
              <div className="col-lg-3 col-6 col-sm-4 col-xxl-2">
                <div className="border-gray p-15 mb-4 bg-white text-center">
                  <a href="">
                    <Skeleton height={100} />
                    <div className=" d-block">
                      <Skeleton />
                    </div>
                  </a>
                  <div>
                    <Skeleton count={0.2} height={20} inline />
                    <Skeleton
                      count={0.2}
                      height={20}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 col-sm-4 col-xxl-2">
                <div className="border-gray p-15 mb-4 bg-white text-center">
                  <a href="">
                    <Skeleton height={100} />
                    <div className=" d-block">
                      <Skeleton />
                    </div>
                  </a>
                  <div>
                    <Skeleton count={0.2} height={20} inline />
                    <Skeleton
                      count={0.2}
                      height={20}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 col-sm-4 col-xxl-2">
                <div className="border-gray p-15 mb-4 bg-white text-center">
                  <a href="">
                    <Skeleton height={100} />
                    <div className=" d-block">
                      <Skeleton />
                    </div>
                  </a>
                  <div>
                    <Skeleton count={0.2} height={20} inline />
                    <Skeleton
                      count={0.2}
                      height={20}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 col-sm-4 col-xxl-2">
                <div className="border-gray p-15 mb-4 bg-white text-center">
                  <a href="">
                    <Skeleton height={100} />
                    <div className=" d-block">
                      <Skeleton />
                    </div>
                  </a>
                  <div>
                    <Skeleton count={0.2} height={20} inline />
                    <Skeleton
                      count={0.2}
                      height={20}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 col-sm-4 col-xxl-2">
                <div className="border-gray p-15 mb-4 bg-white text-center">
                  <a href="">
                    <Skeleton height={100} />
                    <div className=" d-block">
                      <Skeleton />
                    </div>
                  </a>
                  <div>
                    <Skeleton count={0.15} height={30} inline />
                    <Skeleton
                      count={0.15}
                      height={30}
                      style={{ marginLeft: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row ">
              {allSetMenus?.length < 1 ? (
                <Empty />
              ) : (
                allSetMenus?.map((setMenu) => {
                  return (
                    <div
                      className="col-lg-3 col-6 col-sm-4 col-xxl-2"
                      key={setMenu.id}
                    >
                      <div className="border-gray p-15 mb-4 bg-white text-center">
                        <a href="">
                          <img
                            src={
                              setMenu.imagePath
                                ? setMenu.imagePath
                                : "assets/images/imagePlaceholder.png"
                            }
                            alt=""
                          />
                          <div className=" d-block">
                            <h6 className="mb-0 fw-bold">{setMenu.name}</h6>
                          </div>
                        </a>
                        <div>
                          <a
                            className="btn btn-success btn-sm"
                            data-bs-toggle="tooltip"
                            onClick={() => {
                              setIsEdit(true);
                              setShowAdd(true);
                              dispatch({
                                type: "EDIT_SETMENU_REQUEST",
                                payload: setMenu.id,
                              });
                            }}
                            data-bs-placement="left"
                            title=""
                            data-bs-original-title="Edit"
                          >
                            <i
                              className="fas fa-edit text-white"
                              aria-hidden="true"
                            />
                          </a>
                          <Popconfirm
                            okText="Yes"
                            cancelText="No"
                            title="Are you sure you want to delete?"
                            onConfirm={() =>
                              deleteSetMenu(setMenu.id, setMenu.name)
                            }
                          >
                            <a
                              className="btn btn-danger btn-sm ms-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="left"
                              title=""
                              data-bs-original-title="Delete"
                            >
                              <i
                                className="fas fa-trash text-white"
                                aria-hidden="true"
                              />
                            </a>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          <div className="d-flex justify-content-end">
            <Pagination
              total={totalSetMenus ? totalSetMenus : 2}
              showSizeChanger
              pageSize={12}
              onShowSizeChange={onShowSizeChange}
              showTotal={(total, range) =>
                `${allSetMenus ? allSetMenus.length : 0} out of ${total} items`
              }
              defaultCurrent={1}
              onChange={onShowSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetMenuList;
