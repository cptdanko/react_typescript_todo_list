export const CustomMap: { [key: string]: any } = {};

export class Todo {
    
    text: string;
    done: boolean;
    date: Date = new Date();
    id: string = "";
    user_id: string = "";

    /* assign it default variables */
    constructor(text: string, done: boolean, id: string = "", user_id: string = "", date: Date = new Date()) {
        this.text = text;
        this.done = done;
        this.id = id;
        this.user_id = user_id;
        this.date = date;
    }
}

export class User {

    user_id: string;
    email: string;
    name?: string;

    constructor(userId: string, email: string, name?: string) {
        this.user_id = userId;
        this.email = email;
        this.name = name;
    }
}