import supertest from "supertest";
import app from "../src/app.js";
import db from "../src/db.js";

const agent = supertest(app);

beforeAll(async () => {
    await db.connect();
    await db.query(`INSERT INTO task VALUES ("levar minha vó no jiujitsu")`);
    await db.query(`INSERT INTO task VALUES ("dar banho no peixe")`);
    await db.query(`INSERT INTO task VALUES ("levar o cachorro pra prova")`);
    await db.query(`INSERT INTO task VALUES ("regar o vaso")`);
    await db.query(`INSERT INTO task VALUES ("não tankar e ir de base")`);
    await db.query(`INSERT INTO task VALUES ("wardar a tribush do bot")`);
});

describe("todo list testes de integração", () => {
    describe("POST /add-task", () => {
        it("deve retornar CREATED", async () => {
            const task = { task: "dar banho no gato" };
            let response;
            await agent.post("/add-task").send(task).then(ans => response = ans.status);
            expect(response).toEqual(201);
        });
    });

    describe("GET /tasks", () => {
        it("deve retornar a lista de atividades", async () => {
            let tasks;
            await agent.get("/tasks").then(ans => tasks = ans.data);
            expect(tasks.length > 0).toEqual(true);
        });
    });

    describe("GET /task-by-id", () => {
        it("deve retornar uma atividade específica", async () => {
            let task;
            await agent.get("/task-by-id?id=1").then(ans => task = ans.data[0]);
            
            expect(task === "levar minha vó no jiujitsu").toEqual(true);
        });
    });

    describe("PUT /update-tast", () => {
        it("deve alterar uma atividade", async () => {
            let taskBefore;
            await agent.get("/task-by-id?id=1").then(ans => taskBefore = ans.data[0]);
            let taskAfter = "salvar a matéria";
            await agent.put("/change-task?id=1").send({taskAfter});
            
            expect(taskBefore  !== taskAfter).toEqual(true);
        });
    });

    describe("DELETE /delete-task", () => {
        it("deve apagar uma atividade", async () => {
            let tasksSize;
            await agent.get("/tasks").then(ans => tasksSize = ans.data.length);
            let afterSize;
            await agent.delete("/delete-task?id=1").then(ans => afterSize = ans.data.length);

            expect(afterSize < tasksSize).toEqual(true);
        });
    });

});

afterAll(() => {
    db.query(`DELETE FROM tasks WHERE 1=1`);
    db.end();
});