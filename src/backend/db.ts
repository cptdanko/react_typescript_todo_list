import { gapi } from "gapi-script";
import { Todo, User } from "../customTypes";

const TODO_SAVE_KEY = "todoList";
let todoList: Todo[] = [];
const BASE_URL=process.env.REACT_APP_BASE_URL;

export const getExistingList = (): Promise<Todo[] | string> => {
  const list: Todo[] = [];
  //const baseUrl = "https://api.mydaytodos.com"
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/todos`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
      }
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
    fetch(`${BASE_URL}/todo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
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
    fetch(`${BASE_URL}/todo?id=${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
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
    fetch(`${BASE_URL}/todo?id=${todoId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
      }
    }).then(resp => {
      resolve(resp.status);
    }).catch(err =>{
      reject(err);
    })
  }); 
};

export const getUserByEmail = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    return fetch(`${BASE_URL}/user/by/email/${email}`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
      }
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
    fetch(`${BASE_URL}/user/`, {
      method: "POST",
      body: user,
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY ?? '',
      }
    }).then(resp => resp.json())
    .then(data => {
      resolve(data);
    })
    .catch(err => reject(err));
  });
};


