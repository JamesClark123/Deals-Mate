import React, { useState } from "react";
import { observer } from "mobx-react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { TextField, Button } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import SelectField from "./utils/SelectListField";
import { useUIStore } from "hooks/";
import addItemModalStyles from "styles/components/AddItemModalStyles";

function AddItemModal(props) {
  const classes = addItemModalStyles();
  const uiStore = useUIStore();
  const { onClose, reloadData, lists, makeSnackBar, startingValue } = props;
  const [state, setState] = useState({
    list: startingValue,
    inputURL: "",
    body: {},
    uploading: false,
  });

  const itemNameTemp = "Some Name";

  function handleChangeList(selectedList) {
    setState({ ...state, list: selectedList });
  }

  function handleChangeUrl(newURL) {
    setState({ ...state, inputURL: newURL });
  }

  function handleClick() {
    setState({
      ...state,
      uploading: true,
      body: { name: itemNameTemp, url: state.inputURL, list: state.list },
    });
  }
  function handleUploadClose() {
    setState({ ...state, uploading: false, inputURL: "" });
    onClose();
  }

  return (
    <Dialog
      open={uiStore.modalStates.addItem}
      onClose={onClose}
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "WhiteSmoke",
          width: "50vw",
        },
      }}
    >
      <DialogTitle>
        <p className={classes.addNewItemFont}>Add New Item</p>
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "95%",
          padding: "0px",
        }}
      >
        <h3 className={classes.pasteLinkFont} style={{ textAlign: "center" }}>
          Paste link to item
        </h3>
        <TextField
          value={state.inputURL}
          onChange={(e) => {
            handleChangeUrl(e.target.value);
          }}
          InputProps={{
            disableUnderline: true,
            style: { width: "100%" },
          }}
          inputProps={{ style: { textAlign: "center" } }}
          placeholder="Paste your link here"
          style={{
            backgroundColor: "white",
            width: "75%",
            height: "50px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <h3 className={classes.selectListFont} style={{ textAlign: "center" }}>
          Select list
        </h3>
        <SelectField
          listValues={lists}
          promptText="Select"
          onChangeHandler={handleChangeList}
          fillWidthOf="75%"
          startingValue={startingValue}
        />
        <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={handleClick}
        >
          Add Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default observer(AddItemModal);
