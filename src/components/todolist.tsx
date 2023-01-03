import { DeleteRounded } from "@mui/icons-material";
import { Button, Card, CardContent, Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { getExistingList, saveTodoList } from "../dataStore/db";
import { Todo } from "../customTypes";

export const TodoList = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [editTodoIdx, setEditTodoIdx] = useState<number | null>();

    useEffect(() => {
        setTodoList(getExistingList());
    }, []);


    const saveList = (toSave: Todo[]) => {
        saveTodoList(toSave);
        setTodoList(toSave);
    }

    const editTodo: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
        const existingList = getExistingList();
        const todoIdxNo = (btn.currentTarget as any).value;
        const nBeingEdited = Number(todoIdxNo);
        const todo = existingList[Number(todoIdxNo)];
        setTodo(todo.text);
        setEditTodoIdx(nBeingEdited);
    }

    const deleteTodo: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
        const idxNoStr = (btn.currentTarget as any).value;
        const idx = Number(idxNoStr);
        const existingList = getExistingList();
        existingList.splice(idx, 1);
        saveList(existingList);
        if (editTodoIdx === idx) {
            setEditTodoIdx(null);
            setTodo("");
        }
    }

    const saveDoneTodo = (idxNoStr: string) => {
        const list = getExistingList();
        const idx = Number(idxNoStr);
        list[idx].done = !list[idx].done;
        saveList(list);
    }

    const markDoneChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
        var elem = event.target as HTMLTextAreaElement;
        saveDoneTodo(elem.value);
    }

    const saveTodo = () => {
        const existingList = getExistingList();
        if (editTodoIdx != null) {
            const todoBeingEdited = existingList[editTodoIdx];
            todoBeingEdited.text = todo;
            existingList[editTodoIdx] = todoBeingEdited;
        } else {
            const tObj = new Todo(todo, false);
            existingList.push(tObj);
        }
        saveTodoList(existingList);
        setTodoList(existingList);
        setEditTodoIdx(null);
        setTodo("");
    }

    const enterTodo: MouseEventHandler<Element> = () => {
        saveTodo();
    };

    const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
        var elem = event.target as HTMLTextAreaElement;
        setTodo(elem.value);
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            saveTodo();
        }
    }

    return (
        <Card>
            <CardContent sx={{ minWidth: 500, maxWidth: 500 }}>
                <div>
                    <TextField id="standard-basic" label="Enter todo" variant="standard"
                        onChange={handleChange}
                        value={todo}
                        onKeyDown={handleKeyDown} />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button variant="contained" onClick={enterTodo}>Add todo </Button>
                </div>
                <List>
                    {todoList.map((t: Todo, idx: number) => (

                        <ListItem key={idx}>
                            <ListItemIcon>
                                <Checkbox
                                    value={"" + idx}
                                    edge="start"
                                    checked={t.done ? true : false}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={markDoneChange}
                                />
                            </ListItemIcon>
                            <ListItemText primary={t.text} />
                            <IconButton value={"" + idx} onClick={editTodo}>
                                <EditRoundedIcon />
                            </IconButton>
                            <IconButton style={{ marginLeft: 10 }} value={"" + idx} onClick={deleteTodo}>
                                <DeleteRounded key={"" + idx} />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

TodoList.propTypes = {};