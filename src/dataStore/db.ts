import { gapi } from "gapi-script";
import { Todo } from "../customTypes";

const TODO_SAVE_KEY = 'todoList';
let todoList: Todo[] = [];

export const getExistingList = (): Todo[] => {
    
    if(gapi.auth.getToken()) {
        const eListStr: string | null = localStorage.getItem(TODO_SAVE_KEY) ?? "";
        const existingList: Todo[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];
        return existingList;
    } else {
        return todoList;
    }
};

export const saveTodoList = (list: Todo[]) => {
    //if logged in or otherwise
    if(gapi.auth.getToken()) {
        localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(list));
    } else {
        todoList = list;
    }
}