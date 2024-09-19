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
import { fileURLToPath } from "url";
import path from "path";

connectToDatabase();
const server = express();

const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName)
server.use(express.static(path.join(__dirname, 'frontend/build')))

server.use(express.urlencoded({extended: true}))
server.use(express.json());
server.use(cookieParser())

server.use(cors({origin: 'https://keep-hammering.onrender.com', credentials: true}));



server.get('/auth-check', protectRoute, authenticate)
server.use('/', userRouter)
server.use('/exercises/getAll', exerciseRouter )
server.use("/workoutLog",protectRoute, exerciseLogRouter);
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
})

//error handling
server.use(notFound, errorHandler )


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server listening to port", PORT));
