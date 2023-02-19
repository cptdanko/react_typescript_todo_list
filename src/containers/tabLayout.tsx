import { Box, Tabs, Tab, Card, Typography } from "@mui/material";
import { useState } from "react";
import { TodoList } from "../components/todolist";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mdt-tabpanel-${index}`}
      aria-labelledby={`mdt-tab-${index}`}
      className="HomeScreen"
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `mdt-tab-${index}`,
    "aria-controls": `mdt-tabpanel-${index}`,
  };
}
export const TabLayout = (props: any) => {
  const { username } = props;

  return (
    <>
      <TodoList />
    </>
  );
};
