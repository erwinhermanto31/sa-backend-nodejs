
// helper
// ========
module.exports = {
    dateNow: function(params) {
        var d = new Date,
        dformat = [d.getDate(),
                d.getMonth()+1,
                d.getFullYear()].join('-')+' '+
                [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
        return dformat
    }
};