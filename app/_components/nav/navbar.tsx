"use client";
import cx from "clsx";
import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  Drawer,
  Stack,
  Skeleton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/components/nav/navbar.module.css";
import Link from "next/link";
import { LogIn, ScrollText } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

const tabs = [
  "Home",
  "Orders",
  "Education",
  "Community",
  "Forums",
  "Support",
  "Account",
  "Helpdesk",
];

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, isLoading } = useUser();

  const items = tabs.map((tab) => (
    <Link href={`/${tab.toLowerCase()}`} key={tab} onClick={close}>
      <Tabs.Tab value={tab}>{tab}</Tabs.Tab>
    </Link>
  ));

  const mobileItems = tabs.map((tab) => (
    <Link
      href={`/${tab.toLowerCase()}`}
      key={tab}
      className={classes.mobileLink}
      onClick={close}
    >
      {tab}
    </Link>
  ));

  const renderUserSection = () => {
    if (isLoading) {
      return (
        <Group gap={7}>
          <Skeleton circle height={20} />
          <Skeleton height={8} width={100} />
        </Group>
      );
    }

    if (user) {
      return (
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group gap={7}>
                <Avatar
                  src={user.picture}
                  alt={user.name || ""}
                  radius="xl"
                  size={20}
                />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} href="/profile">
              Profile
            </Menu.Item>
            <Menu.Item component={Link} href="/api/auth/logout">
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link href="/api/auth/login">
        <LogIn />
      </Link>
    );
  };

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">
            <ScrollText size={28} />
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            {renderUserSection()}
          </Group>
        </Container>
        <Container size="md">
          <Tabs
            defaultValue="Home"
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack>{mobileItems}</Stack>
      </Drawer>
    </>
  );
}
