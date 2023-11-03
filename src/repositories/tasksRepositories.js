import db from "../db.js";

export const addTaskRepository = async (data) => {
    try {
        await db.query(`INSERT INTO tasks (task) VALUES ($1)`, [data.task]);
    } catch (error) {
        console.log(error);
    }
};

export const getTaskById = async (id) => {
    try {
        const task = await db.query(`SELECT * FROM tasks WHERE id=$1`, [id]);
        return task.rows;
    } catch (error) {
        console.log(error);
    }
};

export const getAllTasks = async () => {
    try {
        const tasks = await db.query(`SELECT * FROM tasks`);
        return tasks.rows;
    } catch (error) {
        console.log(error);
    }
};

export const updateTaskRepository = async (data) => {
    try {
        await db.query(`UPDATE tasks SET task=$1 WHERE id=$2`, [data.task, data.id]);
    } catch (error) {
        console.log(error);
    }
};

export const removeTastRepository = async (data) => {
    try {
        await db.query(`DELETE FROM tasks WHERE id=$1`, [data.id]);
    } catch (error) {
        console.log(error);
    }
};