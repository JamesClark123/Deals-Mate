import { observable } from "mobx";

export default class UIStore {
  @observable loading = false;
  @observable modalStates = {
    addList: false,
    editList: false,
    addItem: false,
    scrappingConfirmation: false,
  };
  @observable snackBars = [];

  closeModal(modalName) {
    this.modalStates[modalName] = false;
  }

  openModal(modalName) {
    this.modalStates[modalName] = true;
  }
}
