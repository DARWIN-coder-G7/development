import express from 'express';
import db from '../db.js';

const router = express.Router();

//Get All Todos for logged-in user
router.get('/',(req,res)=>{
    const getTodoStmt = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
    const todos = getTodoStmt.all(req.userId);
    res.json(todos);
});

//Create A New Todo
router.post('/',(req,res)=>{
    const {task} = req.body;
    const insertTodoStmt = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`);
    insertTodoStmt.run(req.userId,task);
    console.log(insertTodoStmt);
    res.json({id:insertTodoStmt.lastInsertRowid, task , completed:0});
});

//Update a Todo
router.put('/:id',(req,res)=>{
    const {completed} = req.body;
    const {id} = req.params;
    // const {page} = req.query;  /todos/1?page=9
    // const updatedTodo = db.prepare(`UPDATE todos SET task = ?, completed = ? WHERE id = ?`);
    const updatedTodoStmt = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
    updatedTodoStmt.run(completed,id);

    res.json({message:"TODO Completed"});
});

//Delete a Todo
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const userId = req.userId;
    console.log("USER ID",userId,"ID",id);

    if(!userId) {
        console.log('Getting called no Id',userId);
        return;
    }
    const deleteTodoStmt = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    deleteTodoStmt.run(id,userId);
    res.send({message:"Todo Deleted SuccessFully!"});
});

export default router;