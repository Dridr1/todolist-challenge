import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server up on PORT ${PORT}`);
});