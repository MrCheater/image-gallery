export default ({ engine, handle }) => ({
    renderHome(req, res) {
        res.redirect('/images/');
    },

    renderGallery(req, res) {
        engine.render(req, res, '/Gallery');
    },

    renderImage(req, res) {
        engine.render(req, res, '/Image', req.params);
    },

    renderOther(req, res) {
        handle(req, res);
    },
});
