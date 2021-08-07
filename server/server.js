require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts.js');

const path = require('path');

const db = require('./config/connection.js');


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// NOTE:    app.use(cors())     HAS TO BE ABOVE     app.use('/posts', postRoutes)
app.use(cors());

// This enable server connect with routes, first arg is prefix
app.use('/posts', postRoutes);

// NOTE: THIS IS IMPORTANT ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


// app.get('/', (req, res) => {
//   res.send(`hello to joe's mern stack`);
// })


// NOTE: THIS IS IMPORTANT ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

const PORT = process.env.PORT|| 5000;


db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});