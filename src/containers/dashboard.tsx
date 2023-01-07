import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { gapi } from "gapi-script";
import { useState } from "react"
import { Login } from "../components/login";
import { TodoList } from "../components/todolist";

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
    }

    const handleClose = () => {
        setOpenDialog(false);
        setShowTodo(!showTodo);
    }

    return (
        <Card>
            <Login setShowTodo={setShowTodo} setUsername={setUsername} />

            {showTodo ?
                <TodoList /> : <Button onClick={showTodoForm}> Add todo list</Button>
            }

            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Limited functionality'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {'You can get a feel of how to app is, but it will have limited functionality'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}