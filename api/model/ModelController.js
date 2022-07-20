//const { Aggregate } = require('mongoose');
const db = require('./model')
const db2 = require('./ModelCrmsources')
class DocController {

    async display(req, res, next) {
        try {
            var page = req.query.page;
            var count = req.query.count;
            if (page) {
                page = parseInt(page)
                if (page < 1) { page === 1 }
                var skip = (page - 1) * count
                try {
                    const data2 = await db2.find({}, { title: 1 }).skip(skip).limit(count);

                    const counting2 = await db2.countDocuments({ type: '_id' });

                    const finalData = data2.filter(object => object.title.includes('Độ mật'))
                    //const finalFlash = checkData.filter(object => object.documentField.includes('Độ mật'))


                    return res.json({
                        counting2,
                        //checkData,
                        finalData
                    })
                } catch (e) {
                    console.log(e)
                }
            } else {
                const data2 = await db2.find({}, { title: 1 })
                const counting2 = await db2.countDocuments({ type: '_id' });
                return res.json({
                    counting2,
                    data2
                })
            }
        } catch (error) {
            console.log(error)
        }
    };
    //--------------------------------------------------------------------//
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
                    const finalData = data.filter(object => object.documentField.includes(' '))
                    //const newData = finalData.map(data => data.documentField)
                    //const newNew = data.distinct(urgencyLevel, { urgencyLevel: "thng" })
                    // function compare(a, b) {
                    //     // Sử dụng toUpperCase() để chuyển các kí tự về cùng viết hoa
                    //     const typeA = a.documentField.toUpperCase();
                    //     const typeB = b.documentField.toUpperCase();

                    //     let comparison = 0;
                    //     if (typeA > typeB) {
                    //         comparison = 1;
                    //     } else if (typeA < typeB) {
                    //         comparison = -1;
                    //     }
                    //     return comparison * -1;
                    // }

                    //const final2 = finalData.sort(compare);
                    //const newData = final2.map(data => data.documentField)


                    return res.json({
                        counting,
                        //data
                        //array
                        finalData
                        //newData
                        //newNew
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