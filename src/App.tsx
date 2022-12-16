import React, { ButtonHTMLAttributes, ChangeEvent, ChangeEventHandler, EventHandler, MouseEventHandler, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <h2> React todo list with Typescript</h2>
      </header>
      <div>
        <div>
          <div className='TodoArea'>
            <div>
              <input type='text' placeholder='enter todo' onChange={handleChange} value={todo} />
              <button onClick={enterTodo}> Save</button>  
            </div>
            <ul>
              {todoList.map( (t:string, idx: number) => (
                <div className='Todo' key={idx}>
                  {doneMap[idx] ? (
                    <input type='checkbox' checked value={""+idx} onChange={markDoneChange} />
                  ): (
                    <input type='checkbox' value={""+idx} onChange={markDoneChange} />
                  )}
                  <li> {t} </li> 
                  <p style={{marginLeft: 10}}>
                    <button value={""+idx} onClick={editTodo}> Edit</button>
                    <button style={{marginLeft: 10}} value={""+idx} onClick={deleteTodo}> Delete</button>
                    <button style={{marginLeft: 10}} value={""+idx} onClick={markDone}> Done</button>
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
