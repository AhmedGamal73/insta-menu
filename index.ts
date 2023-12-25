import http from 'http';
import app from './app';

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT; // default port to listen

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});