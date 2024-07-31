import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './routes/index.js';
import apiRoute from './routes/api.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the public folder as the static folder for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRoute);
app.use('/api', apiRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`--> Server is running on port ${PORT}`);
    console.log(`--> Local Url:` + `http://localhost:${PORT}`);
});
