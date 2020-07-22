import React, { useState } from "react";
import { observer } from "mobx-react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";
import ImageUpload from "components/utils/ImageUpload.js";
import {} from "api/index.js";
import addListModalStyles from "styles/components/AddListModalStyles";
import { useUIStore, useDataStore } from "hooks/";

function AddListModal() {
  const classes = addListModalStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();
  const [name, setName] = useState("");

  async function uploadList() {
    const body = { title: name, items: [] };
    uiStore.loading = true;
    await dataStore.createNewList(body);
    uiStore.loading = false;
    uiStore.closeModal("addList");
  }

  return (
    <Dialog
      open={uiStore.modalStates.addList}
      onClose={() => uiStore.closeModal("addList")}
      PaperProps={{
        className: classes.paperProps
      }}
    >
      <DialogTitle>
        <p className={classes.addNewListFont}>Create new list</p>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <h3 className={classes.pasteLinkFont} style={{ textAlign: "center" }}>
          Add a title
        </h3>
        <TextField
          InputProps={{
            disableUnderline: true,
            style: { width: "100%" }
          }}
          inputProps={{ className: classes.inputDiv }}
          placeholder="Enter name"
          onChange={e => {
            setName(e.target.value);
          }}
          className={classes.listTitle}
        />
        <h3 className={classes.selectListFont} className={classes.coverFont}>
          Add a cover
        </h3>
        <ImageUpload />

        <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={uploadList}
        >
          Create List
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default observer(AddListModal);
