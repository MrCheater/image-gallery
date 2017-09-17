export default (req, res, next) => {
    if (req.url === '/') {
        res.redirect('/images');
    } else {
        next();
    }
};
