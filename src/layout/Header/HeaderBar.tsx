import { IconLogout, IconSearch } from "@tabler/icons-react";
import {
  Autocomplete,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./HeaderBar.module.css";
import { useNavigate } from "react-router-dom";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function HeaderBar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    navigate("/login", { replace: true });
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
          <MantineLogo color="#20765B" type="mark" size={30} />
          <Title> Meu Financeiro</Title>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>

          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
          <Button bg={"#20765B"} type="submit" size="xs" onClick={handleLogout}>
            <IconLogout stroke={2} />
          </Button>
        </Group>
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <Autocomplete
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            mx="md"
            mb="sm"
          />
          {items}
        </ScrollArea>
      </Drawer>
    </header>
  );
}
