function catchAsyncErrors(api) {
    for (let routeName in api) {
        const route = api[routeName];
        api[routeName] = async (req, res) => {
            try {
                await route(req, res);
            } catch (error) {
                console.error(error);
                res.status(500).send(error.toString());
            }
        };
    }
    return api;
}

export default ({
    models: { Image },
    uploadFile,
    getMetadata,
    compressFile,
    guid,
}) =>
    catchAsyncErrors({
        async uploadImage(req, res) {
            const id = guid();
            const destination = (req.destination = './static');
            const filename = (req.filename = `${id.toString()}.jpg`);
            const path = `${destination}/${filename}`;

            await uploadFile(req, res);

            const meta = await getMetadata(path);

            await compressFile(path);

            const image = new Image({
                ...meta,
                _id: id,
            });

            await image.save();

            res.writeHead(302, { Location: '/' });
            res.end(JSON.stringify({ id }));
        },

        async updateComment(req, res) {
            // TODO
            res.end();
        },

        async loadImage(req, res) {
            // TODO
            res.end();
        },

        async loadImages(req, res) {
            // TODO
            res.end();
        },

        async removeImage(req, res) {
            // TODO
            res.end();
        },
    });
