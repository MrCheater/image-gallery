import multer from 'multer';

export const destination = (req, file, callback) =>
    callback(null, req.destination);

export const filename = (req, file, callback) => callback(null, req.filename);

export default () =>
    multer.diskStorage({
        destination,
        filename,
    });
