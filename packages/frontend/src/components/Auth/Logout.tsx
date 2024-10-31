import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import store from "~/stores/authStore";
import { notifications } from "@mantine/notifications";

const Logout = () => {
  useEffect(() => {
    try {
      store.clear();
      window.location.href = "/";
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  }, []);
  return null;
};

const LogoutObserver = observer(Logout);

export default LogoutObserver;
