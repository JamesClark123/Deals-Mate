import { observable, computed } from "mobx";

export default class UIStore {
  @observable loading = false;
  @observable modalStates = {
    addList: false,
    editList: false,
    addItem: false,
    scrappingConfirmation: false,
  };

  closeModal(modalName) {
    this.modalStates[modalName] = false;
  }

  openModal(modalName) {
    this.modalStates[modalName] = true;
  }
}
