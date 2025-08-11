import express from "express";
import cors from "cors";
import EventRouter from "./event-controller.js";
import DBConfig from "./src/configs/DBConfig.js";

const app = express ();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/event', EventRouter);
app.use('/api/users', EventRouter);

app.listen(port, () => {
console. log(`"server" Listening on http://localhost:${port}`);
})