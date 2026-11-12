import type { ReactNode } from "react";
import { Box } from "@mantine/core";

interface IPageProps {
  children: ReactNode;
}

export const Page = ({ children }: IPageProps) => {
  return (
    <Box maw={1600} mx="auto" p={{ base: 4, md: 6 }}>
      {children}
    </Box>
  );
};
