export type Users = { 
    id: number;
    name: string;
    email: string 
};

export type Todo = { 
    id: number;
    userID: number;
    title: string;
    text: string;
    completed: number 
};