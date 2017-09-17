import Description from './Description';

const Card = ({ _id: id, description }) => (
    <a href={`/images/${id}`}>
        <div className="card">
            <div
                className="card__image"
                style={{
                    backgroundImage: `url(/static/${id}.jpg)`,
                }}
            />
            <Description text={description} />
        </div>
    </a>
);

export default Card;
