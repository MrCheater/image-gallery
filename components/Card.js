import routes from '../server/routes';
const { Link } = routes;

import Description from './Description';

const Card = ({ _id: id, description }) => (
    <Link route={`/images/${id}`}>
        <div className="card">
            <div
                className="card__image"
                style={{
                    backgroundImage: `url(/static/${id}.jpg)`,
                }}
            />
            <Description text={description} />
        </div>
    </Link>
);

export default Card;
