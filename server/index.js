import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cros from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';

import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cros());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use('/posts',postRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const CONNECTION_URL = 'mongodb+srv://vivek:vivek123@cluster0.mydlu.mongodb.net/mernstack?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((err) => console.log(err.message));
