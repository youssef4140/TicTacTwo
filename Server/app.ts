import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import listenForEvents from './routes/socket';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));

listenForEvents(io);


app.get('/*fallback', (req: Request, res: Response) => {
res.sendFile(path.join(distPath, 'index.html'));
});

export default httpServer;
