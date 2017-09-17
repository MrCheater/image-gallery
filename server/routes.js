import routes from 'next-routes';

export default routes()
    .add('Gallery', '/images')
    .add('Image', '/images/:id');
