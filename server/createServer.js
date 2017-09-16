import express from 'express';

import createBackend from './createBackend';
import createFrontend from './createFrontend';

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

    const ui = createFrontend({ engine, handle });
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

    // Frontend
    server.get('/', ui.renderHome);
    server.get('/images/', ui.renderGallery);
    server.get('/images/:id', ui.renderImage);

    // Backend
    server.post('/api/images/', api.uploadImage);
    server.post('/api/images/:id/comments/', api.updateComment);
    server.get('/api/images/', api.loadImages);
    server.get('/api/images/:id', api.loadImage);
    server.delete('/api/images/:id', api.removeImage);

    // Other
    server.get('*', ui.renderOther);

    server.listen(port, error => {
        if (error) {
            console.error(error);
        }
        console.log(`> Ready on http://localhost:${port}`);
    });
};
