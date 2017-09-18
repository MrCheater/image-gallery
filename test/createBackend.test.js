import sinon from 'sinon';

import createBackend, { utils } from '../server/createBackend';

describe('Backend', () => {
    let backend,
        models,
        uploadFile,
        getMetadata,
        compressFile,
        guid,
        save,
        Image,
        image = { image: 'image' },
        images = [{ image: 'image' }];

    beforeEach(() => {
        const emptyFunction = async () => {};

        save = sinon.spy(emptyFunction);

        Image = class Image {
            constructor(args) {
                this.args = args;
                this.save = save;
            }
            static findByIdAndUpdate = sinon.spy(emptyFunction);
            static findById = sinon.spy(async () => image);
            static find = sinon.spy(async () => images);
            static findByIdAndRemove = sinon.spy(emptyFunction);
        };

        sinon.stub(utils, 'catchAsyncErrors').callsFake(obj => obj);

        models = { Image };
        uploadFile = sinon.spy(emptyFunction);
        getMetadata = sinon.spy(emptyFunction);
        compressFile = sinon.spy(emptyFunction);
        guid = sinon.stub().returns(42);

        backend = createBackend({
            models,
            uploadFile,
            getMetadata,
            compressFile,
            guid,
        });

        utils.catchAsyncErrors.restore();

        sinon.stub(console, 'error');
    });

    afterEach(() => {
        console.error.restore();
    });

    it('uploadImage should upload file, extract metadata, compress file and save result to mongodb', async () => {
        const req = {};
        const res = {
            writeHead: sinon.spy(),
            end: sinon.spy(),
        };

        await backend.uploadImage(req, res);

        sinon.assert.calledWith(uploadFile, req, res);
        sinon.assert.calledWith(getMetadata, './static/42.jpg');
        sinon.assert.calledWith(save);
        sinon.assert.calledWith(res.writeHead, 302, { Location: '/' });
        sinon.assert.calledWith(res.end, JSON.stringify({ id: 42 }));
    });

    it('updateDescription should update image description', async () => {
        const req = {
            params: {
                id: Date.now(),
            },
            body: {
                description: Date.now(),
            },
        };
        const res = {
            writeHead: sinon.spy(),
            end: sinon.spy(),
        };

        await backend.updateDescription(req, res);

        sinon.assert.calledWith(
            Image.findByIdAndUpdate,
            req.params.id,
            { $set: { description: req.body.description } },
            { new: false },
        );
        sinon.assert.calledWith(res.writeHead, 302, {
            Location: `/images/${req.params.id}`,
        });
        sinon.assert.calledWith(res.end);
    });

    it('loadImage should return image by id', async () => {
        const req = {
            params: {
                id: Date.now(),
            },
        };
        const res = {
            json: sinon.spy(),
        };

        await backend.loadImage(req, res);

        sinon.assert.calledWith(Image.findById, req.params.id);
        sinon.assert.calledWith(res.json, image);
    });

    it('loadImages should return all images', async () => {
        const req = {};
        const res = {
            json: sinon.spy(),
        };

        await backend.loadImages(req, res);

        sinon.assert.calledWith(Image.find, {});
        sinon.assert.calledWith(res.json, images);
    });

    it('removeImage should remove image by id', async () => {
        const req = {
            params: {
                id: Date.now(),
            },
        };
        const res = {
            writeHead: sinon.spy(),
            end: sinon.spy(),
        };

        await backend.removeImage(req, res);

        sinon.assert.calledWith(Image.findByIdAndRemove, req.params.id);
        sinon.assert.calledWith(res.writeHead, 302, { Location: '/' });
        sinon.assert.calledWith(res.end);
    });

    it('utils.catchAsyncErrors should catch async errors', async () => {
        const send = sinon.spy();
        const status = sinon.stub().callsFake(() => ({
            send,
        }));

        const req = {};
        const res = {
            status,
        };

        const api = utils.catchAsyncErrors({
            helloWorld: async () => {},
            throwError: async () => {
                throw new Error('Async Error');
            },
        });

        await api.helloWorld(req, res);
        await api.throwError(req, res);

        sinon.assert.calledWith(status, 500);
        sinon.assert.calledWith(send, 'Error: Async Error');
    });
});
