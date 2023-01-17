import { gapi } from "gapi-script";
import { Todo, User } from "../customTypes";
import { getWeather } from "./api";

const TODO_SAVE_KEY = "todoList";
let todoList: Todo[] = [];

export const getExistingList = (): Promise<Todo[] | string> => {
  const list: Todo[] = [];
  const token = gapi.auth;
  //const baseUrl = "https://api.mydaytodos.com"
  return new Promise((resolve, reject) => {
    fetch("/todos", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      /*headers: {
                "aws-cloud": "true"
            }*/
    }).then((resp) => resp.json())
      .then((data) => {
        data.forEach((element: any) => {
          try {
            const d = new Date(Date.parse(element["date"]));
            const t = new Todo(
              element["text"],
              JSON.parse(element["done"]),
              element["id"],
              element["user_id"],
              d
            );
            list.push(t);
          } catch (e) {
            console.log(e);
          }
        });
        resolve(list);
      })
      .catch((err) => {
        const msg = `Err fetching data ${JSON.stringify(err)}`;
        console.error(msg);
        reject(msg);
      });
  });

  // getWeather('sydney').then(data => console.log(`Weather data ${JSON.stringify(data)}`));

  /* if(gapi.auth.getToken()) {
        const eListStr: string | null = localStorage.getItem(TODO_SAVE_KEY) ?? "";
        const existingList: Todo[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];
        return existingList;
    } else {
        return todoList;
    }*/
};

export const saveTodoList = (list: Todo[]) => {
  //if logged in or otherwise
  if (gapi.auth.getToken()) {
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(list));
  } else {
    todoList = list;
  }
};

export const saveTodoToDB = (todo: Todo): Promise<Todo> => {
  console.log(`db.ts -> About to save todo ${JSON.stringify(todo)}`);
  return new Promise((resolve, reject) => {
    fetch('/todo/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(todo),
    }).then(resp => resp.json())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    })
  });
};

export const updateTodo = (todo: Todo): Promise<any> => {

  return new Promise((resolve, reject) => {
    fetch(`/todo?id=${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    }).then(resp => {
      resolve(resp.status);
    }).catch(err => {
      reject(err);
    })
  });
};

export const deleteTodoFromDB = (todoId: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    fetch(`/todo?id=${todoId}`, {
      method: "DELETE"
    }).then(resp => {
      resolve(resp.status);
    }).catch(err =>{
      reject(err);
    })
  }); 
};

export const getUserByEmail = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    return fetch(`/user/by/email/${email}`, {
      method: "GET"
    }).then(res => res.json())
    .then(data => {
      if(data) {
        if(data.length > 1) {
          reject({"msg": "500: server side error - Too many users"});
        } else {
          resolve(data[0]);
        }
      }
    }).catch(err => {
      reject(err);
    })
  })
};

export const addNewUser = (user: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch('/user/', {
      method: "POST",
      body: user
    }).then(resp => resp.json())
    .then(data => {
      resolve(data);
    })
    .catch(err => reject(err));
  });
};


