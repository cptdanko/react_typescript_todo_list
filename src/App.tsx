import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import './App.css';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import { BorderColor, Delete, Done } from '@mui/icons-material';

var CustomMap: { [key: string]: any } = {};
function App() {
  const [todo, setTodo] = React.useState("");
  const [todoList, setTodoList] = React.useState<string[]>([]);
  const [editTodoIdx, setEditTodoIdx] = React.useState<number | null>();
  const [doneMap, setDoneMap] = React.useState<typeof CustomMap>({});
  
  useEffect(() => {
    const eListStr: string | null = localStorage.getItem('todoList') ?? "";
    const existingList: string[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];
    setTodoList(existingList);
    let doneMap: typeof CustomMap; 
    if(localStorage.getItem('doneMap')) {
      doneMap = JSON.parse(localStorage.getItem('doneMap') ?? "");
    } else {
      doneMap = {};
    }
    setDoneMap(doneMap);
  }, []);
  
  const getExistingList = (): string[] => {
    const eListStr: string | null = localStorage.getItem('todoList') ?? "";
    const existingList: string[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];    
    return existingList;
  };
  
  const saveTodoList = (toSave: string[]) => {
    localStorage.setItem('todoList', JSON.stringify(toSave));
    setTodoList(toSave);
  }
  
  const enterTodo: MouseEventHandler<Element> = () => {
    const existingList = getExistingList();
    console.log(todo);
    if (editTodoIdx != null) {
      existingList[editTodoIdx] = todo;
    } else {
      existingList.push(todo);
    }
    localStorage.setItem("todoList", JSON.stringify(existingList));
    setTodoList(existingList);
    setTodo("");
    setEditTodoIdx(null);
  };
  
  const editTodo: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
    let temp = btn.target as HTMLTextAreaElement;
    const existingList = getExistingList();
    const nBeingEdited = Number(temp.value);
    const todo = existingList[Number(temp.value)];
    setTodo(todo);
    setEditTodoIdx(nBeingEdited);
  }
  const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    var elem = event.target as HTMLTextAreaElement;

    setTodo(elem.value);
  }
  const saveDoneTodo = (idxNoStr: string) => {
    const doneMap: typeof CustomMap = JSON.parse(localStorage.getItem('doneMap') ?? "{}");
    const idx = Number(idxNoStr);
    doneMap[idx] = !doneMap[idx];
    setDoneMap(doneMap);
    localStorage.setItem('doneMap', JSON.stringify(doneMap));

  }
  const markDone: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
    const idxNoStr = (btn.target as HTMLTextAreaElement).value;
    saveDoneTodo(idxNoStr);
  }
  const markDoneChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    var elem = event.target as HTMLTextAreaElement;
    saveDoneTodo(elem.value);
  }
  const deleteTodo: MouseEventHandler<Element> = (btn: React.MouseEvent<HTMLElement>) => {
    const idxNoStr = (btn.target as HTMLTextAreaElement).value;
    const idx = Number(idxNoStr);
    const existingList = getExistingList();
    existingList.splice(idx, 1);
    saveTodoList(existingList);
  }
  return (
    <div className="App">
      <header>
        <h2> </h2>
      </header>
      <div>
        <div>
          <div className='TodoArea'>
          <Card sx={{ minWidth: 275 }}>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            React todo list with Typescript & MUI
            <hr />
          </Typography>
            <CardContent>
            <div>
              <TextField id="standard-basic" label="Enter todo" variant="standard"  onChange={handleChange} value={todo} />
            </div>
            <div style={{ marginTop: 20}}>
              <Button variant="contained" onClick={enterTodo}>Add todo </Button>
            </div>
            <List>
              {todoList.map( (t:string, idx: number) => (
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      value={"" + idx}
                      edge="start"
                      checked={doneMap[idx] ? true: false}
                      tabIndex={-1}
                      disableRipple
                      onChange={markDoneChange}
                      />
                  </ListItemIcon>
                  <ListItemText primary={t} />
                  <IconButton value={""+idx} onClick={editTodo}>
                      <BorderColor />
                  </IconButton>
                  <IconButton style={{marginLeft: 10}} value={""+idx} onClick={deleteTodo}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}

            </List>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
