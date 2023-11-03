import supertest from "supertest";
import app from "../src/app.js";
import db from "../src/db.js";

const agent = supertest(app);


afterAll(() => {
    db.query(`TRUNCATE TABLE tasks RESTART IDENTITY`);
});

describe("todo list testes de integração", () => {
    describe("POST /add-task", () => {
        it("deve retornar CREATED", async () => {
            const task = { task: "dar banho no gato" };
            try {
                const res = await agent.post("/add-task").send(task);
                expect(res.statusCode).toEqual(201);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe("GET /tasks", () => {
        it("deve retornar a lista de atividades", async () => {
            try {
                await agent.get("/tasks").expect(
                    ans => {
                        if (!(ans.body[0].task.includes("dar banho no gato"))) throw new Error("Atividades não retornadas");
                    }
                );
                return;
            } catch (error) {
                throw new Error(error);
            }
        });
    });

    describe("GET /task-by-id", () => {
        it("deve retornar uma atividade específica", async () => {
            await agent.get("/task-by-id/1").expect(
                ans => {
                    if (!(ans.body[0].task.includes("dar banho no gato"))) throw new Error("Atividade não foi retornada");
                }
            );
        });
    });

    describe("PUT /update-task", () => {
        it("deve alterar uma atividade", async () => {
            try {
                const taskBefore = (await agent.get("/task-by-id/1")).body[0].task;
                const taskAfter = "Levar a vó no jiujitsu";
                await agent.put("/update-task?id=1").send({ task: taskAfter });
                expect((await agent.get("/task-by-id/1")).body[0].task === taskBefore).toEqual(false)
            } catch (error) {
                throw new Error(error);
            }
        });
    });

    describe("DELETE /delete-task", () => {
        it("deve apagar uma atividade", async () => {
            try {
                const tasksSize = (await agent.get("/tasks")).body.length;
                await agent.delete("/delete-task?id=1");
                const afterSize = (await agent.get("/tasks")).body.length;
                console.log({ tasksSize, afterSize });
                expect(afterSize < tasksSize).toBeTruthy();
            } catch (error) {
                throw new Error(error);
            }
        });
    });


});
