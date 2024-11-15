import express from 'express'
import cors from 'cors';
import { establishConnection } from './DBConnection.js';
import signUpRouter from './signUPRoute.js';
import loginRouter from './loginRoute.js';
import displayUsersRouter from './homeRoute.js';
import profileRouter from './profileRoute.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use("/register",signUpRouter);
app.use("/login",loginRouter);
app.use("/getUsers",displayUsersRouter);
app.use("/profile",profileRouter);




app.listen(PORT,()=>{
    console.log(`server is running on localhost:${PORT}`);
    establishConnection();

});