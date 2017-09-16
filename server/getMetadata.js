import util from 'util';

import { ExifImage } from 'exif';

export default async path => {
    try {
        return await util.promisify(ExifImage)({
            image: path,
        });
    } catch (_) {
        return {};
    }
};
