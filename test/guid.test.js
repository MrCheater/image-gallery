import sinon from 'sinon';
import mongoose from 'mongoose';

import guid from '../server/guid';

const id = {id: 42}

let ObjectId;

beforeAll(() => {
    ObjectId = sinon.stub(mongoose.mongo, 'ObjectId').returns(id);
});

afterAll(() => {
    mongoose.mongo.ObjectId.restore();
});

it('guid should return new ObjectId', async () => {
    expect(guid()).toEqual(id)
});