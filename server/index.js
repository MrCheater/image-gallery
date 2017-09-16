import next from 'next';

import mongoose from 'mongoose';
mongoose.Promise = Promise;

import compressFile from './compressFile';
import getMetadata from './getMetadata';
import createServer from './createServer';
import createModels from './createModels';
import createFileUploader from './createFileUploader';
import guid from './guid';

(async () => {
    try {
        const engine = next({ dev: false });
        const handle = engine.getRequestHandler();
        const port = process.env.PORT || 3000;

        const connection = await mongoose.createConnection(
            'mongodb://localhost/image-gallery',
            {
                useMongoClient: true,
            },
        );

        const models = createModels({ connection, mongoose });

        const uploadFile = createFileUploader();

        await createServer({
            engine,
            handle,
            models,
            port,
            uploadFile,
            getMetadata,
            compressFile,
            guid,
        });
    } catch (error) {
        console.error(error);
    }
})();
