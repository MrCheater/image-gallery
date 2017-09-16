import util from 'util';
import multer from 'multer';

import createFileStorage from './createFileStorage';

export default () =>
    util.promisify(
        multer({
            storage: createFileStorage(),
        }).array('image', 1),
    );
