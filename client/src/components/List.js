import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import { Grid, GridList, GridListTile } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Queue from "@material-ui/icons/Queue";
import placeHolderImage from "assets/shoppingPlaceHolder.png";
import listStyles from "styles/components/ListStyles";
import { useDataStore, useUIStore } from "hooks/";

function List() {
  const classes = listStyles();
  const dataStore = useDataStore();
  const uiStore = useUIStore();

  return (
    <div className={classes.shoppingListsContainer}>
      <h1 className={classes.shoppingListText}>My Shopping Lists:</h1>
      <GridList cellHeight={400} className={classes.gridList}>
        {dataStore.lists.map((list) => (
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
                {list.items[0]?.item?.image ? (
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
              <h3 className={classes.countStyle}>{list.items.length} items</h3>
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
}

export default observer(List);
