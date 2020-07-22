import React from "react";
import { observer } from "mobx-react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import scrappingConfirmationStyles from "styles/components/ScrappingConfirmationStyles.js";
import ItemCard from "./items/ItemCard.js";
import { useUIStore, useDataStore } from "hooks/";

// get this set up with the stores
function ScrappingConfirmation() {
  const classes = scrappingConfirmationStyles();
  const uiStore = useUIStore();
  const dataStore = useDataStore();

  function closeModal() {
    uiStore.closeModal("scrappingConfirmation");
  }

  function handleCancelItem() {
    dataStore.cancelPendingItem();
    closeModal();
  }

  async function handleConfirmItem() {
    uiStore.loading = true;
    await dataStore.confirmPendingItem();
    uiStore.loading = false;
    closeModal();
  }

  return (
    <Dialog
      open={uiStore.modalStates.scrappingConfirmation}
      onClose={handleCancelItem}
    >
      <DialogTitle className={classes.dialogTitle}>
        Item Confirmation
      </DialogTitle>
      {dataStore.pendingItem && (
        <>
          <div className={classes.containerStyle}>
            <ItemCard
              hasButton={false}
              hasNewPrice={false}
              tileStyle={classes.tileStyle}
              item={{
                name: dataStore.pendingItem.name,
                image: dataStore.pendingItem.image,
                link: dataStore.pendingItem.url,
                oldPrice: "",
                newPrice:
                  dataStore.pendingItem.data && dataStore.pendingItem.data[0]
                    ? `$${dataStore.pendingItem.data[0].price}`
                    : "",
              }}
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                size="large"
                className={classes.buttonStyle}
                onClick={handleCancelItem}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="large"
                className={classes.buttonStyle}
                onClick={handleConfirmItem}
              >
                Confirm
              </Button>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default observer(ScrappingConfirmation);
