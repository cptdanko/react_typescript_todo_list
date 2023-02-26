import { gapi } from "gapi-script";
import { Todo } from "../customTypes";
import { getWeather } from "./api";

const TODO_SAVE_KEY = "todoList";
let todoList: Todo[] = [];

export const getExistingList = (): Promise<Todo[] | string> => {
  const list: Todo[] = [];
  return new Promise((resolve, reject) => {
    fetch("/todos", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      /*headers: {
                "aws-cloud": "true"
            }*/
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("About to iterate through todo data in db.ts");

        data.forEach((element: any) => {
          try {
            const d = new Date(Date.parse(element["date"]));
            console.log(d);
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
