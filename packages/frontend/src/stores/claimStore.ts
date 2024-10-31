import { makeAutoObservable } from "mobx";

class Store {
  claims: string[] = [];
  editable: boolean = false;
  removable: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEditable(editable: boolean) {
    this.editable = editable;
  }

  setRemovable(removable: boolean) {
    this.removable = removable;
  }

  setClaims(claims) {
    this.claims = claims;
  }

  removeClaim(claim) {
    this.claims = this.claims.filter((c) => c !== claim);
  }

  clear() {
    this.editable = false;
    this.removable = false;
    this.claims = [];
  }
}

const store = new Store();

export default store;
