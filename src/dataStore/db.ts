import { Todo } from "../customTypes";

const TODO_SAVE_KEY = 'todoList';

export const getExistingList = (): Todo[] => {
    const eListStr: string | null = localStorage.getItem(TODO_SAVE_KEY) ?? "";
    const existingList: Todo[] = eListStr?.length > 0 ? JSON.parse(eListStr): [];    
    return existingList;
};

export const saveTodoList = (list: Todo[]) => {
    localStorage.setItem(TODO_SAVE_KEY, JSON.stringify(list));
}