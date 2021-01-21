const express 			= require('express');
const router 			= express();

const shift 	= require('./../controllers/shift');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/shifts', shift.create);
router.get('/shifts', shift.getAll);
router.get('/shifts/:shiftId', shift.getById);
router.put('/shifts/:shiftId', shift.update);
router.put('/shifts/delete/:shiftId', shift.remove);

router.get('')
module.exports = router;