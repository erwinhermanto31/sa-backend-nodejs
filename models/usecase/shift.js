const ShiftMysql = require('../mysql').shift;

let shift


const getList = async function(params) {
    shift = params.toWeb()
    return shift
}
module.exports.getList = getList;

const getById = async function(id) {
    shift = await to(ShiftMysql.findOne({where:{id:id}}))
    return shift
}
module.exports.getById = getById;

const createShift = async function(params) {
    console.log('params')
    console.log(params)
    shift = await ShiftMysql.create(params)
    return shift
}
module.exports.createShift = createShift;

const updateShift = async function(params) {
    console.log("params")
    console.log(params)
    shift = await ShiftMysql.update({ end_time: params.end_time }, {
        where: {
            id: params.id
        }
    })
    return shift
}
module.exports.updateShift = updateShift;

const softDeleteShift = async function(params) {
    console.log("params")
    console.log(params)
    shift = await ShiftMysql.update({ deletedAt: params.deletedAt }, {
        where: {
            id: params.id
        }
    })
    console.log(shift)
    return shift
}
module.exports.softDeleteShift = softDeleteShift;