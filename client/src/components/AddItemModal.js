import React, { useState } from "react";
import { observer } from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import SelectField from "./utils/SelectListField";
import { useUIStore, useDataStore } from "hooks/";
import addItemModalStyles from "styles/components/AddItemModalStyles";

function AddItemModal(props) {
  const classes = addItemModalStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();
  const [inputUrl, setInputUrl] = useState("");

  const itemNameTemp = "tempName";

  async function handleAddItem() {
    if (dataStore.selectedListId === null || inputUrl === "") return;
    uiStore.loading = true;
    await dataStore.createNewItem({
      name: itemNameTemp,
      url: inputUrl,
      listId: dataStore.selectedListId,
    });
    uiStore.closeModal("addItem");
    uiStore.openModal("scrappingConfirmation");
    uiStore.loading = false;
    setInputUrl("");
  }

  return (
    <Dialog
      open={uiStore.modalStates.addItem}
      onClose={() => uiStore.closeModal("addItem")}
      PaperProps={{
        className: classes.paperStyles,
      }}
    >
      <DialogTitle>
        <p className={classes.addNewItemFont}>Add New Item</p>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <h3 className={classes.pasteLinkFont}>Paste link to item</h3>
        <TextField
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            className: classes.linkProps,
          }}
          inputProps={{ className: classes.inputProps }}
          placeholder="Paste your link here"
          className={classes.textField}
        />
        <h3 className={classes.selectListFont}>Select list</h3>
        <SelectField
          listValues={dataStore.lists}
          promptText="Select list"
          onChangeHandler={(list) => dataStore.setSelectedListId(list._id)}
          fillWidthOf="75%"
          startingValue={dataStore.listFromId(dataStore.selectedListId)}
        />
        <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default observer(AddItemModal);
