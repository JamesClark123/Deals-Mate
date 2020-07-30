import { observable, computed } from "mobx";

import {
  removeItem,
  createList,
  addItemToList,
  addItem,
  deleteList,
} from "api/index.js";
import { getUser } from "auth/";
import { getLists } from "api/";

export default class DataStore {
  @observable followingData = [];
  @observable suggestedData = [];
  @observable downloading = false;
  @observable lists = [];
  @observable selectedListId = null;
  @observable pendingItem = null;
  @observable pendingError = "";
  @observable user = null;

  @computed get selectedList() {
    return this.lists.find((list) => list._id === this.selectedListId) || {};
  }

  @computed get selectedListItems() {
    const list = this.selectedList;
    if (!list || !list.items) return [];
    return list.items.map((item) => this.parseItemData(item.item));
  }

  @computed get parsedPendingItem() {
    if (!this.pendingItem) return null;
    return this.parseItemData(this.pendingItem);
  }

  parseItemData(data) {
    const currentPrice = data.data[data.data.length - 1]?.price;
    const lastPrice = data.data[data.data.length - 2]?.price;
    return {
      _id: data._id,
      name: data.name,
      image: data.image,
      url: data.url,
      currentPrice,
      lastPrice,
    };
  }

  listFromId(id) {
    return this.lists.find((list) => list._id === id);
  }

  setSelectedListId(id) {
    this.selectedListId = id;
  }

  async createNewItem(body) {
    try {
      this.pendingError = "";
      this.pendingItem = await addItem(body);
    } catch (err) {
      if (err.error === "This item is already in a list!") {
        this.pendingError = err.error;
      }
    }
  }

  async cancelPendingItem() {
    if (this.pendingItem) {
      this.pendingItem = null;
    }
  }

  async confirmPendingItem() {
    if (this.pendingItem) {
      const updatedList = await addItemToList({
        listId: this.selectedListId,
        itemId: this.pendingItem._id,
      });
      const index = this.lists.findIndex(
        (list) => list._id === this.selectedListId
      );
      this.lists.splice(index, 1, updatedList);
    }
  }

  async createNewList(body) {
    try {
      this.downloading = true;
      const list = await createList(body);
      this.lists.push(list);
      this.downloading = false;
    } catch (err) {
      this.downloading = false;
    }
  }

  async deleteCurrentList() {
    try {
      this.downloading = true;
      await deleteList(this.selectedListId);
      this.lists = this.lists.filter(
        (list) => list._id !== this.selectedListId
      );
      this.selectedListId = null;
      this.downloading = false;
    } catch (err) {
      this.downloading = false;
    }
  }

  async removeListItem(listId, itemId) {
    // TODO: consider doing something different here, like waiting for removal confirmation, try/catch
    // this.lists[index].items = this.lists[index].items.filter(
    //   (item) => item._id !== itemId
    // );
    const newList = await removeItem(listId, itemId);
    const index = this.lists.findIndex((list) => list._id === listId);
    this.lists[index] = newList;
  }

  async getDataOnLogin() {
    await this.loadListData();
    this.user = getUser();
  }

  async loadListData() {
    try {
      this.downloading = true;
      const data = await getLists();
      this.lists = data;
      this.downloading = false;
    } catch (error) {
      // TODO: change to snack bar message
      console.log(error);
      this.downloading = false;
    }
  }
}
