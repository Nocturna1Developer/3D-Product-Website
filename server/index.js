import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

// setting up the enviornment variables
dotenv.config();

const app = express();

// middleware - cross region 
app.use(cors());

app.use(express.json({ limig: "50mb" }))

// consumes the routes from the folder routes
app.use("/api/v1/dalle", dalleRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from DALL.E" })
})

app.listen(8080, () => console.log('Server has started on port 8080'))
