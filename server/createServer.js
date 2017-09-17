import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

import createBackend from './createBackend';
import redirectToImages from './redirectToImages';

export default async ({
    engine,
    handle,
    port,
    models,
    uploadFile,
    getMetadata,
    compressFile,
    guid,
}) => {
    await engine.prepare();

    const api = createBackend({
        models,
        uploadFile,
        getMetadata,
        compressFile,
        guid,
    });

    const server = express();

    // Static
    server.use('/static', express.static('static'));

    // Backend
    server.post('/api/images', api.uploadImage);
    server.post(
        '/api/images/:id/description',
        bodyParser.urlencoded({ extended: false }),
        bodyParser.json(),
        api.updateDescription,
    );
    server.get('/api/images', api.loadImages);
    server.get('/api/images/:id', api.loadImage);
    server.delete('/api/images/:id', api.removeImage);

    // Frontend
    server.use(redirectToImages);
    server.use(handle);

    server.listen(port, error => {
        if (error) {
            console.error(error);
        } else {
            const baseURL = `http://localhost:${port}`;
            axios.defaults.baseURL = baseURL;
            console.log(`> Ready on ${baseURL}`);
        }
    });
};
