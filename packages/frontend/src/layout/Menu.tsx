import { Group, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";
import store from "~/stores/authStore";
import { observer } from "mobx-react-lite";
import CsvModal from "~/components/CSVUpload/CsvModal";

export function Menu() {
  return (
    <Group ml="auto" gap={16} visibleFrom="sm">
      {store.token ? (
        <>
          <CsvModal />
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
    </Group>
  );
}

const MenuObserver = observer(Menu);

export default MenuObserver;
