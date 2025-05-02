import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';



export class TodosController {

    constructor() {}

    public getTodos= async(req:Request, res:Response) => {
        const todos = await prisma.todo.findMany()
        res.json(todos);

    }

    public getTodoById= async(req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid id' });
            return;
        }
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });
       
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

public updateTodo=async(req:Request, res:Response) => {
 
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }
   const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    });



    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    const { text, completedAt } = req.body;
    if (!text) {
        res.status(400).json({ message: 'Invalid text' });
        return;
    }
    const updateTodo = await prisma.todo.update({
        where: {
            id
        },
        data: {
            text,
            completedAt: completedAt ? new Date(completedAt) : null
        }
    });
   
    res.json(updateTodo);

}

public deleteTodo=async(req:Request, res:Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid id' });
        return;
    }

    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    });


    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    const deleted = await prisma.todo.delete({
        where: {
            id
        }
    });

    (deleted)
        ? res.json({ deleted })
        : res.status(400).json({ message: 'Todo not found' });

}
}


