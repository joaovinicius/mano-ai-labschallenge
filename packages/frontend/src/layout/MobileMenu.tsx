import { AppShell, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";
import store from "~/stores/authStore";
import { observer } from "mobx-react-lite";

export function MobileMenu() {
  return (
    <AppShell.Navbar py="md" px={4}>
      <UnstyledButton component={Link} to="/">
        Home
      </UnstyledButton>
      {store.token ? (
        <>
          <UnstyledButton component={Link} to="/claims/upload">
            Upload
          </UnstyledButton>
          <UnstyledButton component={Link} to="/claims/mine">
            My Claims
          </UnstyledButton>
          <UnstyledButton component={Link} to="/logout">
            Logout
          </UnstyledButton>
        </>
      ) : (
        <UnstyledButton component={Link} to="/sign-in">
          Sign-in
        </UnstyledButton>
      )}
    </AppShell.Navbar>
  );
}

const MobileMenuObserver = observer(MobileMenu);

export default MobileMenuObserver;
