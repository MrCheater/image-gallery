import axios from 'axios';

import Header from '../components/Header';
import Description from '../components/Description';

class Image extends React.PureComponent {
    state = {
        description: (this.props.image && this.props.image.description) || '',
    };

    onChangeDescription = event => {
        const description = event.target.value;

        this.setState({
            description,
        });
    };

    onChangeCompleteDescription = async event => {
        const description = event.target.value;

        try {
            await axios.post(
                `/api/images/${this.props.image._id}/description`,
                { description },
            );
        } catch (error) {
            alert(error);
        }
    };

    onRemoveImage = async () => {
        try {
            await axios.delete(`/api/images/${this.props.image._id}`);
            location.href = '/images/';
        } catch (error) {
            alert(error);
        }
    };

    render() {
        const { image } = this.props;

        if (!image) {
            return (
                <div className="image">
                    <Header />
                    <div className="image__content">Image not found</div>
                </div>
            );
        }

        const id = image._id;

        return (
            <div className="image">
                <Header />
                <div className="image__content">
                    <img className="image__body" src={`/static/${id}.jpg`} />
                    <form
                        action={`/api/images/${id}/description`}
                        method="post"
                    >
                        <Description
                            editable
                            text={this.state.description}
                            onChange={this.onChangeDescription}
                            onChangeComplete={this.onChangeCompleteDescription}
                        />
                        <button type="submit">Save Description</button>
                        <button onClick={this.onRemoveImage}>
                            Remove Image
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

Image.getInitialProps = async ({ query }) => {
    const { data: image } = await axios(`/api/images/${query.id}`);
    return { image };
};

export default Image;
