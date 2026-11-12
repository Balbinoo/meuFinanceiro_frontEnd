import { Outlet } from "react-router-dom";
import { Box } from "@mantine/core";
import { SideBar } from "./SideBar/SideBar";
import { HeaderBar } from "./Header/HeaderBar";

export function MainLayout() {
  return (
    <>
      <HeaderBar />
      <SideBar />

      <Box
        component="main"
        style={{
          marginTop: 56,
          marginLeft: 0,
          minHeight: "calc(100vh - 56px)",
          minWidth: 0,
          boxSizing: "border-box",
          backgroundColor: "#F6F7F3",
        }}
        p="md"
      >
        <Outlet />
      </Box>
    </>
  );
}
