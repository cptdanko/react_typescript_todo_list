export const CustomMap: { [key: string]: any } = {};

export class Todo {
    
    text: string;
    done: boolean;

    constructor(text: string, done: boolean) {
        this.text = text;
        this.done = done;
    }
}