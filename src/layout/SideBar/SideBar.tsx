import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconSettings,
  IconUser,
  IconChevronLeft,
  IconChevronRight,
  IconPigMoney,
  IconMoneybagMinus,
  IconCashPlus,
} from "@tabler/icons-react";
import { Tooltip, UnstyledButton } from "@mantine/core";
import { ROUTES } from "../../router/routes";
import classes from "./SideBar.module.css";

const mainLinksMockdata = [
  { icon: IconGauge, label: "Dashboard", path: ROUTES.DASHBOARD },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Transactions",
    path: ROUTES.TRANSACTIONS,
  },
  { icon: IconPigMoney, label: "Economy", path: ROUTES.ECONOMY },
  { icon: IconMoneybagMinus, label: "Expenses", path: ROUTES.EXPENSES },
  { icon: IconCashPlus, label: "Income", path: ROUTES.INCOME },
  { icon: IconUser, label: "Account", path: ROUTES.ACCOUNT },
  { icon: IconSettings, label: "Settings", path: ROUTES.SETTINGS },
];

export function SideBar() {
  const [expanded, setExpanded] = useState(false);

  const mainLinks = mainLinksMockdata.map((link) => {
    const Icon = link.icon;

    return (
      <Tooltip
        key={link.label}
        label={link.label}
        position="right"
        withArrow
        disabled={expanded}
      >
        <UnstyledButton
          component={NavLink}
          to={link.path}
          end
          className={classes.mainLink}
          aria-label={link.label}
          title={expanded ? undefined : link.label}
        >
          <Icon size={22} stroke={1.5} />

          {expanded && <span className={classes.linkLabel}>{link.label}</span>}
        </UnstyledButton>
      </Tooltip>
    );
  });

  return (
    <nav className={`${classes.navbar} ${expanded ? classes.expanded : ""}`}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>{mainLinks}</div>

        <UnstyledButton
          className={classes.toggle}
          onClick={() => setExpanded((current) => !current)}
          aria-label={expanded ? "Recolher menu" : "Expandir menu"}
          title={expanded ? "Recolher menu" : "Expandir menu"}
        >
          {expanded ? (
            <IconChevronLeft size={20} />
          ) : (
            <IconChevronRight size={20} />
          )}
        </UnstyledButton>
      </div>
    </nav>
  );
}
