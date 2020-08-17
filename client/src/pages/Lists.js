import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  InputBase,
  GridList,
  GridListTile,
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Queue from "@material-ui/icons/Queue";
import { observer } from "mobx-react";

import EditListModal from "components/modals/EditListModal.js";
import AddListModal from "components/modals/AddListModal.js";
import AddItemModal from "components/modals/AddItemModal.js";
import ScrappingConfirmationModal from "components/modals/ScrappingConfirmationModal.js";
import SelectField from "components/SelectListField";
import { useDataStore, useCreateNewItem, useUIStore } from "hooks/";

import addItemBarStyles from "styles/components/AddItemBarStyles";
import listStyles from "styles/components/ListStyles";

//TODO: this List component could use some extra attention to styling, it looks like garbage rn
const List = observer(function () {
  const classes = listStyles();
  const dataStore = useDataStore();
  const uiStore = useUIStore();

  return (
    <div className={classes.shoppingListsContainer}>
      <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
      <GridList cellHeight={400} className={classes.gridList}>
        {dataStore.lists &&
          dataStore.lists.map((list) => (
            <GridListTile
              key={list.title}
              className={classes.listTile}
              onClick={(_event) => {
                dataStore.setSelectedListId(list._id);
                uiStore.openModal("editList");
              }}
            >
              <div className={classes.hoverTransition} />
              <Grid container direction="column" alignItems="center">
                <div className={classes.imageContainer}>
                  {list.items &&
                  list.items.length > 0 &&
                  list.items[0]?.item?.image ? (
                    <img
                      src={list.items[0]?.item?.image}
                      alt="list"
                      width="100%"
                    />
                  ) : (
                    <Queue className={classes.emptyListIcon} />
                  )}
                </div>
                <h2 className={classes.titleContainer}>{list.title}</h2>
                <h3 className={classes.countStyle}>
                  {list.items.length || 0} items
                </h3>
              </Grid>
            </GridListTile>
          ))}
        <GridListTile className={classes.newListGrid}>
          <div
            className={classes.hoverTransition}
            onClick={() => uiStore.openModal("addList")}
          />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.newList}
          >
            <Add className={classes.addButton} />

            <h1 className={classes.newListTitle}>Add New List</h1>
          </Grid>
        </GridListTile>
      </GridList>
    </div>
  );
});

const AddItemBar = observer(function () {
  const [inputUrl, setInputUrl] = useState("");

  const classes = addItemBarStyles();
  const dataStore = useDataStore();
  const createNewItem = useCreateNewItem();

  async function handleAddItem() {
    if (dataStore.selectedListId === null || inputUrl === "") return;
    await createNewItem({ url: inputUrl, listId: dataStore.selectedListId });
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
      <span className={classes.tipFont}>
        Enter a product from Amazon and we'll email you when the price drops
      </span>
    </Grid>
  );
});

function Lists() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(230, 230, 232, 1)";
  }, []);

  return (
    <div>
      <ScrappingConfirmationModal />
      <EditListModal />
      <AddListModal />
      <AddItemModal />
      <AddItemBar />
      <List />
    </div>
  );
}

export default Lists;
