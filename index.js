import express from "express";
import cors from "cors";
import EventRouter from "./event-controller.js";

const app = express ();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/eventos', EventRouter);
app.use('/api/users', EventRouter);



app.listen(port, () => {
console. log(`"server" Listening on http://localhost:${port}`);
})