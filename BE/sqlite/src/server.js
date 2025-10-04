import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';


const App = express();
const PORT = process.env.PORT || 3000;

//Get the File path From the URL of the current Module
const __filename = fileURLToPath(import.meta.url);
//Get the Directory Name from the filePath
const __dirname = dirname(__filename);

//Middleware
App.use(express.json());

//serves the HTML File from the /public directory
//telling Express to serve all files from the public folder as static assets/file.
//the below line is responsible for fetching css from html or else server will get confused where to look after for css referred in Html
App.use(express.static(path.join(__dirname, '../public'))); //look one folder outside for the public directory dont look in the same folder

//serving Up the Html File From the /public Directory
App.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
App.use('/auth', authRoutes);
App.use('/todos', authMiddleware, todoRoutes);

App.listen(PORT, () => { console.log(`SERVER Started ON PORT :: ${PORT}`) });