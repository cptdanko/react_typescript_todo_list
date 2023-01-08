import { Button, Card } from "@mui/material";
import { gapi } from "gapi-script";
import { useState } from "react";
import { SimpleDialog } from "../components/dialogs/simpleDialog";
import { Login } from "../components/login";
import { TabLayout } from "./tabLayout";

/**
 * The Dashboard container which will have either show the login component
 * or the todo list component with a logout option
 */
export const Dashboard = () => {
  const [showTodo, setShowTodo] = useState(false);
  const [username, setUsername] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const showTodoForm = () => {
    if (!gapi.auth.getToken()) {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setShowTodo(!showTodo);
  };

  return (
    <Card>
      <Login setShowTodo={setShowTodo} setUsername={setUsername} />

      {showTodo ? (
        <TabLayout username={username} />
      ) : (
        <Button onClick={showTodoForm}> Add todo list</Button>
      )}
      <SimpleDialog
        openDialog={openDialog}
        handleClose={handleClose}
        dialogHeader="Limited functionality"
        dialogMessage="You can get a feel of how to app is, but it will have limited functionality"
      />
    </Card>
  );
};
