import express from "express";
import cors from "cors";
import { userRouter } from "./src/routes/userRouter.js";
import { exerciseRouter } from "./src/routes/exercisesRoute.js";
import { exerciseLogRouter } from "./src/routes/exerciseLogRoute.js";
import { errorHandler, notFound } from "./src/errorhandler/errorhandler.js";
import connectToDatabase from "./src/utils/databaseConnect.js";
import { protectRoute } from "./src/utils/protectRoute.js";
import { authenticate } from "./src/utils/authenticate.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";

const server = express();
connectToDatabase();

server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cookieParser())
server.use(cors({origin: 'http://localhost:5000', credentials: true}));


server.get('/auth-check', protectRoute, authenticate)
server.use('/', userRouter)
server.use('/exercises/getAll', exerciseRouter )
server.use("/workoutLog",protectRoute, exerciseLogRouter);

//error handling
server.use(notFound, errorHandler )


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server listening to port", PORT));
