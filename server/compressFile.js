import jimp from 'jimp';

export default async path => {
    const image = await jimp.read(path);
    return image.resize(512, jimp.AUTO).write(path);
};
