import { UserType } from "lib/types/auth";
import { makeAutoObservable } from "mobx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Store {
  private _token?: string;
  private _user?: UserType;

  constructor() {
    makeAutoObservable(this);
    const token = cookies.get("token");
    if (token) {
      this._token = token;
    }
  }

  setToken(token: string) {
    cookies.set("token", token);
    this._token = token;
  }

  setUser(user: UserType) {
    this._user = user;
  }

  clear() {
    this._user = undefined;
    this._token = undefined;
    cookies.remove("token");
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }
}

const store = new Store();

export default store;
