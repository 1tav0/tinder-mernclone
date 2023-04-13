import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Cards from './dbcards.js'
import cors from 'cors'

//App config
const app = express();
dotenv.config();
const port = process.env.PORT || 8001
//Middlewares
app.use(express.json());
app.use(cors());

//DB config
mongoose.connect(process.env.mongodb)
        .then(() => {
            app.listen(port, () => {
                console.log(`listening on port ${port}`);
            })
            console.log('connected to db successfully');
        })
        .catch( err => {
            console.log(err);
        })

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send("hello");
})

app.post('/tinder/card', (req, res) => {
    const tinderCard = req.body;

    Cards.create(tinderCard)
        .then(data => res.status(200).send(data))
        .then(err => res.status(500).send(err))
})

app.get('/tinder/cards', (req, res) => {
    Cards.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})