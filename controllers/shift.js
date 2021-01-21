const shiftUsecase = require('../models/usecase/shift');
const ShiftMysql = require('../models/mysql').shift;
const { check, validationResult } = require('express-validator');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let err, shifts;

    [err, shifts] = await to(shiftUsecase.createShift(body));
    if(err) return ReE(res, err, 422);
    
    return ReS(res,{shifts:shifts.toWeb()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res, next){
    res.setHeader('Content-Type', 'application/json');

    let err, shifts;
    [err, shifts] = await to(ShiftMysql.findAll({where:{deletedAt:null}}));
    
    let shift_json =[]
    for( let i in shifts){
        let shift = shifts[i];
        let shift_info = shift.toWeb();
        shift_json.push(shift_info);
    }
    
    return ReS(res, {status:200,data:{shift:shift_json}});
}
module.exports.getAll = getAll;

const getById = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    
    let  shift, shift_id, err;
    shift_id = req.params.shiftId

    console.log(shift_id)
    shift = await to(shiftUsecase.getById(shift_id))
    console.log(shift.shift())
    return ReS(res, {shift:shift[0][1]});
}
module.exports.getById = getById;

const update = async function(req, res){
    let err, shift, shift_id, data;
    shift_id = req.params.shiftId
    shift = req.shift;
    data = req.body;
    console.log(data)
    console.log(data.end_time)

    var par = {}
    par.id = shift_id
    par.end_time = data.end_time
    console.log("par")
    console.log(par)

    err = await to(shiftUsecase.updateShift(par));
    if(err[0] != null ){
        console.log(err[0])
        return ReE(res, err);
    }
    return ReS(res, {message :'success set end time '}, 201);
}
module.exports.update = update;

const remove = async function(req, res){
    let err,shift,shift_id, data;
    shift_id = req.params.shiftId
    var now = new Date(); 
    data = req.body;
    shift = req.shift;
    data.deletedAt = now
    data.id = shift_id

    err = await to(shiftUsecase.softDeleteShift(data));
    if(err[0] != null ){
        console.log(err[0])
        return ReE(res, err);
    }

    return ReS(res, {message:'Deleted shift'}, 201);
}
module.exports.remove = remove;