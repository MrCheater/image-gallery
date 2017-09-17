export default ({ connection, mongoose: { Schema } }) => ({
    Image: connection.model('Image', {
        image: Schema.Types.Mixed,
        thumbnail: Schema.Types.Mixed,
        exif: Schema.Types.Mixed,
        gps: Schema.Types.Mixed,
        interoperability: Schema.Types.Mixed,
        makernote: Schema.Types.Mixed,
        description: String,
    }),
});
