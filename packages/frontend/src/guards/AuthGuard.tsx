import { Navigate, Outlet, redirect } from "react-router-dom";
import store from "~/stores/authStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { getMe } from "~/services/authService";

const AuthGuard = () => {
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getMe();
        store.setUser(response.data);
      } catch (error) {
        console.error(error);
        if (error.message === "Invalid token") {
          store.clear()
          redirect("/sign-in");
        }
      }
    }
    if (store.token && !store.user) {
      fetchUser();
    }
  }, []);

  if (!store.token) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

const AuthGuardObserver = observer(AuthGuard);

export default AuthGuardObserver;
