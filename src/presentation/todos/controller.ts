import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

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

public createTodo=async(req:Request, res:Response) => {

const { text } = req.body;
if (!text) {
    res.status(400).json({ message: 'Invalid text' });
    return;
}

const todo = await prisma.todo.create({
    data: {
        text
    },
});


res.json(todo);

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
    const { text,createdAt } = req.body;
    if (!text) {
        res.status(400).json({ message: 'Invalid text' });
        return;
    }


    todo.text = text || todo.text;
    (createdAt==='null')? todo.createdAt=null : todo.createdAt=new Date( createdAt || todo.createdAt );
    res.json(todo);

}

public deleteTodo=(req:Request, res:Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted',todos });

}
}


