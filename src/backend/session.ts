import { User } from "../customTypes";

export class UserSession {

    private static _instance: UserSession;

    private constructor() { }
    
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
    SESSION_USER_ID = "sessionuser";
    SESSION_USER = "";

    startUserSession(user: User) {
        localStorage.setItem(this.SESSION_USER_ID, user.user_id);
        localStorage.setItem(this.SESSION_USER, JSON.stringify(user));
    };

    endUserSession() {
        localStorage.removeItem(this.SESSION_USER_ID);
        localStorage.removeItem(this.SESSION_USER);
    };

    getUserIdInSession(): string | null {
        return localStorage.getItem(this.SESSION_USER_ID);
    };

    getUserEmailInSession(): string {
        const userObj = JSON.parse(localStorage.getItem(this.SESSION_USER) ?? "");
        return userObj.email ?? "";
    }
}