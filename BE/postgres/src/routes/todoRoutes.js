import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

//Get All Todos for logged-in user
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    });
    res.json(todos);
});

//Create A New Todo
router.post('/', async (req, res) => {
    const { task } = req.body;
    const createTodo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    });
    res.json({ id: createTodo.id, task, completed: 0 });
});

//Update a Todo
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const updateTodo = await prisma.todo.update({
        where: {
            id: Number.parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    });

    res.json({ message: "TODO Completed" });
});

//Delete a Todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const deleteTodo = await prisma.todo.delete({
        where: {
            id: Number.parseInt(id),
            userId: userId
        }
    });
    res.send({ message: "Todo Deleted SuccessFully!" });
});

export default router;