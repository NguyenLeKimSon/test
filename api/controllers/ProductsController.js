const Course = require('../Model')


class ProductsCtrl {


    get(req, res, next) {
        Course.find({})
            .then(courses => res.json(courses))
            .catch(next)

    }
    show(req, res, next) {
        // res.send('hello')
        Course.findOne({ id: req.params.id })
            .then(course => {
                res.json(course);
            })
            .catch(next);
    }
    create(req, res, next) {
        const course = new Course(req.body);
        course.save()
        res.send('saved')
    }
    async edit(req, res) {
        const course = await new Course(req.body);
        const c = await Course.findOneAndDelete({ id: req.params.id });
        course.save()
        return res.send('updated')
    }
    async delete(req, res, next) {
        const c = await Course.findOneAndDelete({ id: req.params.id });
        res.send('deleted')


    }
}
module.exports = new ProductsCtrl