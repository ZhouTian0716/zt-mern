import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// NOTE:    app.use(cors())     HAS TO BE ABOVE     app.use('/posts', postRoutes)
app.use(cors());

// This enable server connect with routes, first arg is prefix
app.use('/posts', postRoutes);

// NOTE: THIS IS IMPORTANT ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.get('/', (req, res) => {
  res.send(`hello to joe's mern stack`);
})
// NOTE: THIS IS IMPORTANT ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


  mongoose.set('useFindAndModify', false);