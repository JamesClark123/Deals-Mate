import { observable, computed } from "mobx";

import {
  addFollowing,
  removeFollowing,
  removeItem,
  getAllListItems,
  createList,
  addItemToList,
  addItem,
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
  @observable user = null;

  @computed get selectedList() {
    return this.lists.find((list) => list._id === this.selectedListId) || {};
  }

  @computed get selectedListItems() {
    const list = this.selectedList;
    console.log("LIST: ", list);
    if (!list || !list.items) return [];
    return list.items.map((item) => {
      const data = item.item;
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
    });
  }

  listFromId(id) {
    return this.lists.find((list) => list._id === id);
  }

  setSelectedListId(id) {
    this.selectedListId = id;
  }

  async createNewItem(body) {
    try {
      this.pendingItem = await addItem(body);
    } catch (err) {
      console.log(err);
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

  async removeListItem(listId, itemId) {
    // TODO: consider doing something different here, like waiting for removal confirmation
    // this.lists[index].items = this.lists[index].items.filter(
    //   (item) => item._id !== itemId
    // );
    const newList = await removeItem(listId, itemId);
    const index = this.lists.findIndex((list) => list._id === listId);
    this.lists[index] = newList;
  }

  async loadItemData(listId) {
    const data = await getAllListItems(listId);
    // TODO: do something here
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

  // async fetchSuggestedData() {
  //   try {
  //     this.suggestedData = await getUser();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // followingFromSuggested(idList, myId) {
  //   let newSuggested = [];
  //   this.suggestedData.map((person, _index) => {
  //     if (idList.find((id) => id._id === person._id) !== undefined) {
  //       this.followingData.push(person);
  //     } else {
  //       if (person._id != myId) {
  //         newSuggested.push(person);
  //       }
  //     }
  //   });
  //   this.suggestedData = newSuggested;
  //   console.log(this.followingData);
  //   console.log(this.suggestedData);
  // }

  // async fetchFollowingData() {
  //   try {
  //     const data = await getUser();
  //     this.followingFromSuggested(data.following, data._id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async addFollowing(id) {
  //   const person = this.suggestedData.find((el) => el._id === id);
  //   const index = this.suggestedData.findIndex((el) => el._id === id);
  //   const body = { userId: getUser()._id, followId: id };
  //   try {
  //     await addFollowing(body);
  //     this.suggestedData.splice(index, 1);
  //     this.followingData.push(person);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async removeFollowing(id) {
  //   const person = this.followingData.find((el) => el._id === id);
  //   const index = this.followingData.findIndex((el) => el._id === id);
  //   const body = { userId: getUser()._id, followId: id };
  //   try {
  //     await removeFollowing(body);
  //     this.followingData.splice(index, 1);
  //     this.suggestedData.push(person);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async downloadAllData() {
  //   this.downloading = true;
  //   await this.fetchSuggestedData();
  //   await this.fetchFollowingData();
  //   this.downloading = false;
  //   this.downloaded = true;
  // }
}
