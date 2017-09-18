import sinon from 'sinon';
import jimp from 'jimp';

import compressFile from '../server/compressFile';

let image, resize, write;

beforeAll(() => {
    write = sinon.spy();
    resize = sinon.stub().callsFake(() => ({ write }));
    image = {
        resize,
    };
    sinon.stub(jimp, 'read').callsFake(async () => image);
});

afterAll(() => {
    jimp.read.restore();
});

it('compressFile should compress file', async () => {
    const path = 'path';

    await compressFile(path);

    sinon.assert.calledWith(jimp.read, path);
    sinon.assert.calledWith(resize, 512, jimp.AUTO);
    sinon.assert.calledWith(write, path);
});
