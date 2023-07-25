import express from 'express';
import morgan from 'morgan';

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use(morgan('combined'))

export default app;