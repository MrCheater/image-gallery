import createBackend from './createBackend';
import createFrontend from './createFrontend';

export default async ({ engine, handle, server, port }) => {
    await engine.prepare();

    const ui = createFrontend({ engine, handle });
    const api = createBackend();

    // Frontend
    server.get('/', ui.renderHome);
    server.get('/images/', ui.renderGallery);
    server.get('/images/:id', ui.renderImage);

    // Backend
    server.post('/api/images/', api.uploadImage);
    server.post('/api/images/:imageID/comments/', api.createComment);
    server.put('/api/images/:imageID/comments/:commentID', api.updateComment);
    server.get('/api/images/', api.loadImages);
    server.get('/api/images/:imageID', api.loadImage);
    server.get('/api/images/:imageID/comments/', api.loadComments);

    // Other
    server.get('*', ui.renderOther);

    server.listen(port, error => {
        if (error) {
            console.error(error);
        }
        console.log(`> Ready on http://localhost:${port}`);
    });
};
