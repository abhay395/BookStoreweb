import express from "express";
// import { MONGODBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoutes.js'
// import path, { join } from 'path'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors'
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors())
// app.use(cors({
//   origin:'http://localhost:3000/',
//   methods:["GET","POST","DELETE","PUT"],
//   allowedHeaders:['Content-Type']
// }))
app.use(express.json());
app.use('/books',bookRoute)
app.use(express.static(join(__dirname,'build')))
mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(process.env.PORT, () => console.log(`server litening of port ${process.env.PORT}`));
  })
  .catch((error) => console.log(error));
