import next from 'next';
import express from 'express';

import createServer from './createServer';

(async () => {
    const engine = next({ dev: false });
    const handle = engine.getRequestHandler();
    const server = express();
    const port = process.env.PORT || 3000;

    try {
        await createServer({
            engine,
            handle,
            server,
            port,
        });
    } catch (error) {
        console.error(error);
    }
})();
