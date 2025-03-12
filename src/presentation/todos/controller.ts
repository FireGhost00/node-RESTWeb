import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk',createdAt: new Date() },
    { id: 2, text: 'Buy bread',createdAt: null },
    { id: 3, text: 'Buy butter',createdAt: new Date() },
  ];

export class TodosController {

    constructor() {}

    public getTodos=(req:Request, res:Response) => {
        res.json(todos);

    }

    public getTodoById=(req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const todo = todos.find(todo => todo.id === id);
        (todo) ? res.json(todo) : res.status(404).json({ message: 'Todo not found' });

}

public createTodo=(req:Request, res:Response) => {

const { text } = req.body;
if (!text) {
    res.status(400).json({ message: 'Invalid text' });
    return;
}
const newTodo = { id: todos.length + 1, text, createdAt: null };
todos.push(newTodo);

res.json(newTodo);

}

public updateTodo=(req:Request, res:Response) => {
 
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ message: 'Invalid text' });
        return;
    }
    todo.text = text;
    res.json(todo);

}

}



