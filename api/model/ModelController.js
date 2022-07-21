const dbOutGoing = require('./ModelOutGoing')
const dbCrmSources = require('./ModelCrmsources')
class DocController {

    // async display(req, res, next) {
    //     try {
    //         const data1 = await dbOutGoing.find({}, { privateLevel: 1 });
    //         const data2 = await dbCrmSources.distinct('data.value', { title: "Độ mật" });
    //         const arr = []
    //         for (let i = 0; i < data1.length; i++) {
    //             const finalData = data1[i]
    //             const PL = finalData.privateLevel.toString()
    //             const length = data2.length
    //             for (let j = 0; j < length; j++) {
    //                 if (!data2.includes(`${PL}`)) {
    //                     arr.push(finalData)
    //                 }
    //             }
    //         }
    //         return res.json({
    //             //data2,
    //             arr
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };
    async display(req, res, next) {
        try {

            const data1 = await dbOutGoing.distinct('privateLevel')
            const data2 = await dbCrmSources.distinct('data.value', { title: "Độ mật" });
            var result = [];
            for (var i = 0; i < data1.length; i++) {
                if (!(data2.indexOf(data1[i]) > -1)) {
                    result.push(data1[i])
                }
            }

            console.log(result.toString())

            return res.json({
                result
            })
        } catch (e) {
            console.log(e)
        }
    };
    async edit(req, res, next) {
        try {
            await dbOutGoing.updateMany(
                { privateLevel: "Mật thư" },
                {
                    $set: {
                        privateLevel: "m-th"
                    }
                }
            )

            res.send('updated')

        } catch (e) {
            console.log(e)
        }
    }
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
                    const data = await dbOutGoing.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 }).skip(skip).limit(count)

                    const counting = await dbOutGoing.countDocuments({ type: '_id' });
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
                const data = await dbOutGoing.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 })
                const counting = await dbOutGoing.countDocuments({ type: '_id' });
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
        const data = await dbOutGoing.find({}, { abstractNote: 1, documentType: 1, urgencyLevel: 1, privateLevel: 1, documentField: 1 })
        const counting = await dbOutGoing.countDocuments({ type: '_id' });
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
    // async update(req, res) {
    //     const course = await new dbOutGoing(req.body);
    //     const c = await dbOutGoing.findOneAndDelete({ _id: req.params._id });
    //     course.save()
    //     return res.send('updated')
    // }
    // async delete(req, res, next) {
    //     const c = await dbOutGoing.findOneAndDelete({ _id: req.params._id });
    //     res.send('deleted')

    // }
}
module.exports = new DocController