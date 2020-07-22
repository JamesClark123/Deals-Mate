import React, { useEffect } from "react";

import List from "components/List.js";
import AddItemBar from "components/AddItemBar";
import EditList from "components/EditListModal.js";
import AddList from "components/AddListModal.js";
import AddItemModal from "components/AddItemModal.js";
import ScrappingConfirmation from "components/ScrappingConfirmation.js";

function Lists() {
  useEffect(() => {
    document.body.style.backgroundColor = "WhiteSmoke";
  }, []);

  return (
    <div>
      <AddItemBar />
      <ScrappingConfirmation />
      <List />
      <EditList />
      <AddList />
      <AddItemModal />
    </div>
  );
}

export default Lists;
