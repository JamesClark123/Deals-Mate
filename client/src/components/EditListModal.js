import React from "react";
import { observer } from "mobx-react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, GridList } from "@material-ui/core";
import ItemCard from "components/items/ItemCard.js";
import editListModalStyles from "styles/components/EditListModalStyles";
import { useDataStore, useUIStore } from "hooks/";

function EditListModal() {
  const classes = editListModalStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();

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
      <div className={classes.gridListContainer}>
        <GridList cols={1} className={classes.gridListStyles}>
          {!dataStore.downloading &&
            dataStore.selectedList.items &&
            dataStore.selectedList.items.map((item) => (
              <ItemCard
                key={item._id}
                hasButton={true}
                buttonOnClick={() => {
                  dataStore.removeListItem(
                    dataStore.selectedList._id,
                    item.item._id
                  );
                }}
                hasNewPrice={true}
                tileStyle={classes.tileStyle}
                item={{
                  name: item.item.name,
                  image: item.item.image,
                  link: item.item.url,
                  oldPrice:
                    item.item.data === undefined
                      ? ""
                      : item.item.data.length > 1
                      ? `$${item.item.data[1].price}`
                      : "",
                  newPrice:
                    item.item.data === undefined
                      ? ""
                      : `$${item.item.data[0].price}`,
                }}
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
