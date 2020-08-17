import React from "react";
import { observer } from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, GridList } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons/";

import ItemCard from "components/ItemCard.js";
import editListModalStyles from "styles/components/EditListModalStyles";
import { useDataStore, useUIStore } from "hooks/";

function EditListModal() {
  const classes = editListModalStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();

  async function handleDeleteList() {
    uiStore.loading = true;
    await dataStore.deleteCurrentList();
    uiStore.closeModal("editList");
    uiStore.loading = false;
  }

  return (
    <Dialog
      open={uiStore.modalStates.editList}
      onClose={() => uiStore.closeModal("editList")}
      PaperProps={{ style: { background: "WhiteSmoke", width: "50vw" } }}
    >
      <DialogTitle className={classes.titleFont}>
        {dataStore.selectedList.title}
      </DialogTitle>
      <h1 className={classes.itemCountFont}>
        {dataStore.selectedList.items
          ? dataStore.selectedList.items.length
          : ""}{" "}
        items
      </h1>
      <DeleteOutline
        onClick={handleDeleteList}
        className={classes.actionIcon}
      />
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {!dataStore.downloading &&
            dataStore.selectedList &&
            dataStore.selectedListItems &&
            dataStore.selectedListItems.map((item) => (
              <ItemCard
                key={item._id}
                hasActionButtons={true}
                showOldPrice={true}
                tileStyle={classes.tileStyle}
                item={item}
              />
            ))}
        </GridList>
        <Button
          size="large"
          className={classes.addNewItemButton}
          onClick={() => {
            uiStore.closeModal("editList");
            uiStore.openModal("addItem");
          }}
        >
          Add New Item
        </Button>
      </div>
    </Dialog>
  );
}

export default observer(EditListModal);
