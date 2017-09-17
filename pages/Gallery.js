import axios from 'axios';
import Card from '../components/Card';
import Header from '../components/Header';

class Gallery extends React.PureComponent {
    onFileSelect = () => this.refs.form.submit();

    render() {
        const { images } = this.props;

        return (
            <div className="gallery">
                <Header />
                <div className="gallery__upload">
                    <form
                        ref="form"
                        action="/api/images"
                        method="post"
                        encType="multipart/form-data"
                        onChange={this.onFileSelect}
                    >
                        <input
                            name="image"
                            type="file"
                            accept="image/jpeg, image/jpg"
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="gallery__content">
                    <div className="gallery__images">
                        {images.map((image, index) => (
                            <Card {...image} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

Gallery.getInitialProps = async () => {
    const { data: images } = await axios('/api/images');
    return { images };
};

export default Gallery;
