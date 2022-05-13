import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import { getRoutes } from "./routes";

createConnection().then(async connection => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(getRoutes());

    app.listen(5000, () => {
        console.log("Server is listening on port 5000...");
    })
}).catch(error => console.log(error));
