'use strict';

module.exports = (app, db) => {
    app.get('/', (req, res) => {
        let title = process.env.NODE_ENV;
        res.render('./index.ejs', { title: title });
    });
    app.get('/index', (req, res) => {
        let title = process.env.NODE_ENV;
        res.render('./index.ejs', { title: title });
    })
}