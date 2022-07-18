const modelRouter = require('./ModelRoutes')


function route(app) {
    app.use('/doc', modelRouter);




}

//------------------------------------------------------//








module.exports = route;
