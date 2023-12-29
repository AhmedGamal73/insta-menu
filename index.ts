import http, { Server } from 'http';
import app from './app';

const server: Server = http.createServer(app);

const API_PORT: string | undefined = process.env.API_PORT;
const port: string | number = process.env.PORT || API_PORT || 3000; // default port to listen

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});