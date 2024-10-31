import { AppShell, Group, Burger, UnstyledButton, MantineProvider } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import Menu from "~/layout/Menu";
import MobileMenu from "~/layout/MobileMenu";
import { Link } from "react-router-dom";

export default function BasicLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <UnstyledButton className="uppercase font-bold" component={Link} to="/">
            Mano AI
          </UnstyledButton>
          <Menu />
        </Group>
      </AppShell.Header>
      <MobileMenu />
      <AppShell.Main className="flex flex-col h-full pt-[60px]">
        <MantineProvider>
          <Notifications />
          <Outlet />
        </MantineProvider>
      </AppShell.Main>
    </AppShell>
  );
}
