import { DeleteRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { deleteTodoFromDB, getExistingList, getTodoForUser, saveTodoList, saveTodoToDB, updateTodo } from "../backend/db";
import { Todo } from "../customTypes";
import { UserSession } from "../backend/session";
import { SimpleDialog } from "./dialogs/simpleDialog";

export const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [editTodoIdx, setEditTodoIdx] = useState<number | null>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);

  const session = UserSession.Instance;

  useEffect(() => {
    const userId = UserSession.Instance.getUserIdInSession() ?? "";
    getTodoForUser(userId).then(response => {
      if(typeof response === "string") {
        console.log("Error fetching" + response);
      } else {
        setTodoList(response);
      }
    }).catch(e => {
      console.error(e);
    })
  }, []);

  const editTodo: MouseEventHandler<Element> = (
    btn: React.MouseEvent<HTMLElement>
  ) => {
    const todoIdxNo = (btn.currentTarget as any).value;
    const nBeingEdited = Number(todoIdxNo);
    const todo = todoList[todoIdxNo];
    setTodo(todo.text);
    setEditTodoIdx(nBeingEdited);
  };

  const deleteTodo: MouseEventHandler<Element> = (
    btn: React.MouseEvent<HTMLElement>
  ) => {
    const idxNoStr = (btn.currentTarget as any).value;
    const idx = Number(idxNoStr);
    const todo = todoList[idx];
    delRemove(todo.id, idx);
    if(idx === editTodoIdx) {
      setEditTodoIdx(null);
    }
  };

  const delRemove = async (todoId: string, idx: number) => {
    const delResp = await deleteTodoFromDB(todoId);
    if(typeof delResp != "number") {
      console.log(`Error deleting todo, because ${delResp}`);
      return;
    }
    delete todoList[idx];
    setTodoList(todoList); 
    setTriggerUpdate(!triggerUpdate);   
  }

  const markDoneChange: ChangeEventHandler<Element> = async (event: ChangeEvent) => {
    var elem = event.target as HTMLTextAreaElement;
    const idx = Number(elem.value);
    const tEdit = todoList[idx];
    tEdit.done = !tEdit.done;
    await updateTodo(todoList[idx]);
    setTriggerUpdate(!triggerUpdate);
  };

  const saveTodo = async () => {
    if (editTodoIdx != null) {
      const todoBeingEdited = todoList[editTodoIdx];
      todoBeingEdited.text = todo;
      todoList[editTodoIdx].text = todo;
      const updateResult = await updateTodo(todoBeingEdited);
      if(updateResult >= 300) {
        setOpenDialog(true);
      }
    } else {
      const tObj = new Todo(todo, false);
      tObj.user_id = session.getUserIdInSession() ?? "";
      tObj.date = new Date();
      const todoSaved = await saveTodoToDB(tObj);
      todoList.push(todoSaved);
      setTodoList(todoList);
    }
    setEditTodoIdx(null);
    setTodo("");
  };

  const enterTodo: MouseEventHandler<Element> = () => {
    saveTodo();
  };
  
  const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    const elem = event.target as HTMLTextAreaElement;
    setTodo(elem.value);
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      saveTodo();
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Card>
      <CardContent>
        <div>
          <TextField
            id="standard-basic"
            label="Enter todo"
            variant="standard"
            onChange={handleChange}
            value={todo}
            onKeyDown={handleKeyDown}
            multiline={true}
            fullWidth={true}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" onClick={enterTodo}>
            Add todo{" "}
          </Button>
        </div>
        <List>
          {todoList.map((t: Todo, idx: number) => (
            <ListItem key={idx}>
              <ListItemIcon>
                <Checkbox
                  value={"" + idx}
                  edge="start"
                  checked={t.done ? true : false}
                  disableRipple
                  onChange={markDoneChange}
                />
              </ListItemIcon>
              <ListItemText primary={t.text} />
              <IconButton value={"" + idx} onClick={editTodo}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                style={{ marginLeft: 10 }}
                value={"" + idx}
                onClick={deleteTodo}
              >
                <DeleteRounded key={"" + idx} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>

      <SimpleDialog
        openDialog={openDialog}
        handleClose={handleClose}
        dialogHeader="Error"
        dialogMessage="Error updating your todo, try again later"
      />
    </Card>
  );
};

TodoList.propTypes = {};
