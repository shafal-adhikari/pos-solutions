import React, { useState } from "react";
import AddSetMenu from "./AddSetMenu";
import SetMenuList from "./SetMenuList";
function SetMenu() {
  const [showAddSetMenu, setShowAddSetMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {!showAddSetMenu && (
        <SetMenuList
          showAdd={showAddSetMenu}
          setShowAdd={setShowAddSetMenu}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      {showAddSetMenu && (
        <AddSetMenu
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setShowAdd={setShowAddSetMenu}
        />
      )}
    </>
  );
}

export default SetMenu;
