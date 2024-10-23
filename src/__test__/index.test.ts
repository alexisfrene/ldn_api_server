import supertest from "supertest";
import { app } from "../app";

const api = supertest(app);
console.log(api);
