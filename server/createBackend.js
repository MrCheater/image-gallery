export const utils = {
    catchAsyncErrors(api) {
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
    },
};

export default ({
    models: { Image },
    uploadFile,
    getMetadata,
    compressFile,
    guid,
}) =>
    utils.catchAsyncErrors({
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

        async updateDescription(req, res) {
            await Image.findByIdAndUpdate(
                req.params.id,
                { $set: { description: req.body.description } },
                { new: false },
            );
            res.writeHead(302, { Location: `/images/${req.params.id}` });
            res.end();
        },

        async loadImage(req, res) {
            const image = await Image.findById(req.params.id);
            res.json(image);
        },

        async loadImages(req, res) {
            const images = await Image.find({});
            res.json(images);
        },

        async removeImage(req, res) {
            await Image.findByIdAndRemove(req.params.id);
            res.writeHead(302, { Location: `/` });
            res.end();
        },
    });
