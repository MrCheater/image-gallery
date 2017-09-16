const Gallery = () => (
    <div>
        <form action="/api/images" method="post" encType="multipart/form-data">
            <input name="image" type="file" accept="image/jpeg, image/jpg" />
            <input type="submit" value="Submit" />
        </form>
    </div>
);

export default Gallery;
