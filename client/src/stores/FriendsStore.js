import { observable } from "mobx";

import { getUser, addFollowing, removeFollowing } from "api/index.js";
import { user } from "auth/AuthContext";

export default class FriendsStore {
  @observable followingData = [];
  @observable suggestedData = [];
  @observable downloading = false;
  @observable downloaded = false;

  async fetchSuggestedData() {
    try {
      this.suggestedData = await getUser();
    } catch (err) {
      console.log(err);
    }
  }

  followingFromSuggested(idList, myId) {
    let newSuggested = [];
    this.suggestedData.map((person, _index) => {
      if (idList.find(id => id._id === person._id) !== undefined) {
        this.followingData.push(person);
      } else {
        if (person._id != myId) {
          newSuggested.push(person);
        }
      }
    });
    this.suggestedData = newSuggested;
    console.log(this.followingData);
    console.log(this.suggestedData);
  }

  async fetchFollowingData() {
    try {
      const data = await getUser();
      this.followingFromSuggested(data.following, data._id);
    } catch (err) {
      console.log(err);
    }
  }

  async addFollowing(id) {
    const person = this.suggestedData.find(el => el._id === id);
    const index = this.suggestedData.findIndex(el => el._id === id);
    const body = { userId: user().user._id, followId: id };
    try {
      await addFollowing(body);
      this.suggestedData.splice(index, 1);
      this.followingData.push(person);
    } catch (err) {
      console.log(err);
    }
  }

  async removeFollowing(id) {
    const person = this.followingData.find(el => el._id === id);
    const index = this.followingData.findIndex(el => el._id === id);
    const body = { userId: user().user._id, followId: id };
    try {
      await removeFollowing(body);
      this.followingData.splice(index, 1);
      this.suggestedData.push(person);
    } catch (err) {
      console.log(err);
    }
  }

  async downloadAllData() {
    this.downloading = true;
    await this.fetchSuggestedData();
    await this.fetchFollowingData();
    this.downloading = false;
    this.downloaded = true;
  }
}
