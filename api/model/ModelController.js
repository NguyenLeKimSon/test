const { Aggregate } = require('mongoose');
const db = require('./model')

class DocController {

    async get(req, res, next) {
        try {
            var page = req.query.page;
            var count = req.query.count;
            if (page) {
                page = parseInt(page)
                if (page < 1) { page === 1 }
                var skip = (page - 1) * count
                try {
                    const data = await db.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 }).skip(skip).limit(count)

                    const counting = await db.countDocuments({ type: '_id' });
                    // const array = []
                    // for (let i = 0; i < data.length; i++) {
                    //     const field = data[i].documentField
                    //     if (field.includes(" ")) {
                    //         // return res.json({
                    //         //     counting,
                    //         array.push(field)
                    //         // })
                    //     }
                    // }
                    const finalData = data.filter(object => object.documentField.includes(''))
                    //const newData = finalData.map(data => data.documentField).sort()
                    function compare(a, b) {
                        // Sử dụng toUpperCase() để chuyển các kí tự về cùng viết hoa
                        const typeA = a.documentField.toUpperCase();
                        const typeB = b.documentField.toUpperCase();

                        let comparison = 0;
                        if (typeA > typeB) {
                            comparison = 1;
                        } else if (typeA < typeB) {
                            comparison = -1;
                        }
                        return comparison * -1;
                    }

                    const final2 = finalData.sort(compare);
                    const newData = final2.map(data => data.documentField)


                    return res.json({
                        counting,
                        // data
                        //array
                        //finalData
                        newData
                    })
                } catch (e) {
                    console.log(e)
                }
            } else {
                const data = await db.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 })
                const counting = await db.countDocuments({ type: '_id' });
                return res.json({
                    counting,
                    data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    async show(req, res) {
        // res.send('hello')
        const data = await db.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 })
        const counting = await db.countDocuments({ type: '_id' });
        res.json({
            counting,
            data
        })
    }
    create(req, res, next) {
        const course = new db(req.body);
        course.save()
        res.send('saved')
    }
    async edit(req, res) {
        const course = await new db(req.body);
        const c = await Course.findOneAndDelete({ _id: req.params._id });
        course.save()
        return res.send('updated')
    }
    async delete(req, res, next) {
        const c = await db.findOneAndDelete({ _id: req.params._id });
        res.send('deleted')


    }
}
module.exports = new DocController