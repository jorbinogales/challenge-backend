import 'reflect-metadata';
import express from "express";
import bodyParser from 'body-parser';
import {router} from "./common/routes";
import { errorHandlerMiddleware, responseMiddleware} from "./common/middlewares";
import {envs} from "./common/config";
import cors from 'cors';


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
const corsOptions = {
    origin: envs.origin
};
const app = express();
const PORT = envs.port ;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(responseMiddleware);
app.use('/', router);
app.use(errorHandlerMiddleware);



app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});