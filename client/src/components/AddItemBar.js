import React, { useState } from "react";
import { Button, Grid, Paper, InputBase } from "@material-ui/core";
import { observer } from "mobx-react";

import SelectField from "components/utils/SelectListField";
import addItemBarStyles from "styles/components/AddItemBarStyles";
import { useUIStore, useDataStore } from "hooks/";

function AddItemBar() {
  const classes = addItemBarStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();
  const [inputUrl, setInputUrl] = useState("");

  const itemNameTemp = "Some Name";

  async function handleAddItem() {
    if (dataStore.selectedListId === null || inputUrl === "") return;
    uiStore.loading = true;
    await dataStore.createNewItem({
      name: itemNameTemp,
      url: inputUrl,
      listId: dataStore.selectedListId,
    });
    uiStore.openModal("scrappingConfirmation");
    uiStore.loading = false;
    setInputUrl("");
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.bodyStart}
    >
      <h1 className={classes.addNewItem}>Add new item:</h1>
      <Grid container direction="row" justify="center">
        <Paper className={classes.paperLinkContainer}>
          <InputBase
            value={inputUrl}
            placeholder="Paste your link here"
            className={classes.linkInput}
            onChange={(e) => {
              setInputUrl(e.target.value);
            }}
          />
        </Paper>
        <Paper className={classes.paperListContainer}>
          <SelectField
            listValues={dataStore.lists}
            promptText="Select list"
            onChangeHandler={(list) => (dataStore.selectedListId = list._id)}
            fillWidthOf="8vw"
            fontSize=".8em"
            alignTextTo="start"
            textPadding="0px 0px 0px 8px"
          />
          <Button
            variant="contained"
            size="large"
            style={{
              borderRadius: 25,
              width: "100px",
            }}
            onClick={handleAddItem}
            className={classes.addItemButton}
          >
            Add
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default observer(AddItemBar);
