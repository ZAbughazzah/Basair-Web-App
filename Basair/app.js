import express from 'express';
import morgan from 'morgan';
import router from './router.js';
import mongoose from "mongoose";
import BasairRepository from "./repository/basair-repo.js";

const basairRepository = new BasairRepository()
const port = process.env.PORT || 9999;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', router);

const mongoUrl = 'mongodb://127.0.0.1:27017/Basair';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoUrl, options, async function(err) {
        if (err) {
            console.log("Failed to connect to monogoDb " + err);
            return;
        }
        else {
            console.log('Successfully connected to database')
            await basairRepository.initDb();

            app.listen(port, () => {
                console.log(`Server started @http://localhost:${port}`);
            });
        }
    });