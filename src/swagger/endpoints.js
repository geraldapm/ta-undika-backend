module.exports = function(app) {
    app.get('/users/:id', (req, res) => {
        // eslint-disable-next-line no-unused-vars
        const filtro = req.query.filtro;

        return res.status(404).send(false);
    });
};
