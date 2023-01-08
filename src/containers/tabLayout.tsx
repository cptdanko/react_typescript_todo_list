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
  const [value, setValue] = useState<number>(0);
  const { username } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {username ? (
        <Typography variant="h4" component="h4" sx={{padding: 1}}>
          {" "}
          Hi {username}{" "}
        </Typography>
      ) : (
        ""
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ textTransform: "capitalize" }}
            label={`Your Todo`}
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label={`Your Notes`}
            {...a11yProps(1)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label={`Your Weather`}
            {...a11yProps(2)}
          />
          <Tab
            sx={{ textTransform: "capitalize" }}
            label={`Your News`}
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TodoList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card sx={{ padding: 10 }}>Coming soon</Card>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Card sx={{ padding: 10 }}>Coming soon</Card>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Card sx={{ padding: 10 }}>Coming soon</Card>
      </TabPanel>
    </>
  );
};
