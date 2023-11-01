import db from "../db";

export const addTaskRepository = async (data) => {
    try {
        db.query("INSERT INTO tasks (task) VALUES ($1)", [data.task]);
    } catch (error) {
        console.log(error);
    }
}

export const getAllTasks = async () => {
    try {
        console.log(`SELECT * FROM tasks`);
    } catch (error) {
        console.log(error);
    }
}

export const alterTaskRepository = async (data) => {
    try {
        db.query(`UPDATE tasks SET task=$1 WHERE id=$2`, [data.task, data.id]);
    } catch (error) {
        console.log(error);
    }
}

export const removeTastRepository = async (data) => {
    try {
        db.query(`DELETE FROM tasks WHERE id=$1`, [data.id]);
    } catch (error) {
        console.log(error);
    }
}