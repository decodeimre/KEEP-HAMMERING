import express from "express";
import cors from "cors";
import { userRouter } from "./src/routes/userRouter.js";
import { exerciseRouter } from "./src/routes/exercisesRoute.js";
import { exerciseLogRouter } from "./src/routes/exerciseLogRoute.js";
import { errorHandler, notFound } from "./src/errorhandler/errorhandler.js";
import connectToDatabase from "./utils/databaseConnect.js";
import "dotenv/config.js";

const server = express();

connectToDatabase();


server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cors());


server.use('/', userRouter)
server.use('/exercises/getAll', exerciseRouter )
server.use("/workoutLog", exerciseRouter, exerciseLogRouter);

//error handling
server.use(notFound, errorHandler )


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server listening to port", PORT));
