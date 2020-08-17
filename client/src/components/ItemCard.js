import React from "react";
import { Link, DeleteOutline } from "@material-ui/icons/";

import itemCardStyles from "styles/components/ItemCardStyles";
import { useDataStore, useShowSnackBar } from "hooks";

function ItemCard(props) {
  const { hasActionButtons, showOldPrice, tileStyle, item } = props;
  const classes = itemCardStyles(props);
  const dataStore = useDataStore();
  const showSnackBar = useShowSnackBar();

  const oldPrice =
    !item || !item.lastPrice
      ? ""
      : item.lastPrice > item.currentPrice
      ? `$${item.lastPrice}`
      : "";

  const newPrice = !item || !item.currentPrice ? "" : `$${item.currentPrice}`;

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(item.url);
    showSnackBar("Link copied to clip board");
  }

  function makeActionButtons() {
    return hasActionButtons ? (
      <div className={classes.iconBlock}>
        <DeleteOutline
          onClick={() =>
            dataStore.removeListItem(dataStore.selectedList._id, item._id)
          }
          className={classes.actionIcon}
        />
        <Link onClick={copyLinkToClipboard} className={classes.actionIcon} />
      </div>
    ) : null;
  }

  function makePrices() {
    return (
      <div className={classes.prices}>
        {showOldPrice && <h5 className={classes.oldPriceFont}>{oldPrice}</h5>}
        <p className={classes.newPriceFont}>{newPrice}</p>
      </div>
    );
  }

  function makeTitle() {
    return (
      <div className={classes.title}>
        <h3
          className={classes.itemNameFont}
          onClick={() => window.open(item.url)}
        >
          {item.name}
        </h3>
      </div>
    );
  }

  function makeTextBlock() {
    return (
      <div className={classes.textBlock}>
        {makeTitle()}

        <div className={classes.lowerTextBlock}>
          {makePrices()}
          {makeActionButtons()}
        </div>
      </div>
    );
  }

  return (
    <div key={item.name} className={`${tileStyle} ${classes.tileStyle}`}>
      <div className={classes.contentContainer}>
        <div className={classes.imgContainerStyle}>
          <img src={item.image} alt="item" className={classes.imgStyle} />
        </div>
        {makeTextBlock()}
      </div>
    </div>
  );
}

export default ItemCard;
