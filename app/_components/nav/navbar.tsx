"use client";
import cx from "clsx";
import React, { useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { LogIn, ScrollText, User, LogOut } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";

const tabs = ["Home", "Tasks", "Helpdesk"];

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    if (pathname === "/") return "Home";
    const path = pathname.substring(1);
    const matchingTab = tabs.find(
      (tab) => tab.toLowerCase() === path.toLowerCase(),
    );
    return matchingTab || "Home";
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab
      value={tab}
      key={tab}
      onClick={() =>
        router.push(
          tab.toLowerCase() === "home" ? "/" : `/${tab.toLowerCase()}`,
        )
      }
      className={classes.tabLink}
    >
      {tab}
    </Tabs.Tab>
  ));

  const mobileItems = tabs.map((tab) => (
    <UnstyledButton
      key={tab}
      className={cx(classes.mobileLink, {
        [classes.mobileLinkActive]:
          tab.toLowerCase() === "home"
            ? pathname === "/"
            : `/${tab.toLowerCase()}` === pathname,
      })}
      onClick={() => {
        router.push(
          tab.toLowerCase() === "home" ? "/" : `/${tab.toLowerCase()}`,
        );
        close();
      }}
    >
      {tab}
    </UnstyledButton>
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
          width={110}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
          visibleFrom="sm"
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
            <Menu.Item onClick={() => router.push("/profile")}>
              <Group gap={6} justify="flex-start">
                <User size={14} />
                <Text size="sm">Profile</Text>
              </Group>
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/api/auth/logout")}>
              <Group gap={6} justify="flex-start">
                <LogOut size={14} />
                <Text size="sm">Logout</Text>
              </Group>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <UnstyledButton
        onClick={() => router.push("/api/auth/login")}
        visibleFrom="sm"
      >
        <LogIn />
      </UnstyledButton>
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
            value={getActiveTab()}
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
        <Stack>
          {mobileItems}
          {user ? (
            <>
              <UnstyledButton
                className={classes.mobileLink}
                onClick={() => {
                  router.push("/profile");
                  close();
                }}
              >
                <Group gap={6}>
                  <User size={14} />
                  <Text>Profile</Text>
                </Group>
              </UnstyledButton>
              <UnstyledButton
                className={classes.mobileLink}
                onClick={() => {
                  router.push("/api/auth/logout");
                  close();
                }}
              >
                <Group gap={6}>
                  <LogOut size={14} />
                  <Text>Logout</Text>
                </Group>
              </UnstyledButton>
            </>
          ) : (
            <UnstyledButton
              className={classes.mobileLink}
              onClick={() => {
                router.push("/api/auth/login");
                close();
              }}
            >
              <Group gap={6}>
                <LogIn size={14} />
                <Text>Login</Text>
              </Group>
            </UnstyledButton>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
