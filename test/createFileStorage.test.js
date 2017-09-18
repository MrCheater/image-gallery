import sinon from 'sinon';
import multer from 'multer';

import createFileStorage, {
    destination,
    filename,
} from '../server/createFileStorage';

let diskStorage;

beforeAll(() => {
    diskStorage = sinon.stub(multer, 'diskStorage');
});

afterAll(() => {
    multer.diskStorage.restore();
});

it('createFileStorage should create a file storage', async () => {
    await createFileStorage();

    sinon.assert.calledWith(diskStorage, {
        destination,
        filename,
    });
});

it('destination should call callback with arguments [null, req.destination]', () => {
    const req = {
        destination: 'destination',
    };
    const callback = sinon.spy();

    destination(req, null, callback);

    sinon.assert.calledWith(callback, null, req.destination);
});

it('filename should call callback with arguments [null, req.filename]', () => {
    const req = {
        filename: 'filename',
    };
    const callback = sinon.spy();

    filename(req, null, callback);

    sinon.assert.calledWith(callback, null, req.filename);
});
