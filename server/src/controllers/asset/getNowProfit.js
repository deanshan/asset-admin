const asset = require('../../models/asset');
const charge = require('../../models/charge');
const moment = require('moment');
var async = require('async');

module.exports = (req, res) => {
  if (!req.query.asset_id) {
    return res.send({
      status: 0,
      msg: '参数错误'
    });
  }

  var year = (new Date()).getFullYear()
  if (req.query.year) {
    year = req.query.year
  }
  var yearStart = Date.parse(new Date(year, 0, 1));
  var yearEnd = Date.parse(new Date(Number(year) + 1, 0, 1)) - 1000;


  async.parallel([
    checkAssetBase,
    getChargeList
  ], function (err, result) {
    if (err) {
      return res.send({
        status: 0,
        msg: '数据库错误'
      });
    }
    if (!result) {
      return res.send({
        status: 0,
        data: []
      });
    }
    formatTrend(result)
  });


  function checkAssetBase() {
    asset.findOne({
      where: {
        is_delete: 0,
        asset_id: req.query.asset_id,
        charge_time: { $gte: moment(yearStart).format(), $lte: moment(yearEnd).format() }
      }, attributes: ['asset_id', 'profit', 'create_time']
    }).then(data => {
      callback(null, data)
    }).catch(e => {
      callback(e)
    })
  }

  function getChargeList() {
    charge.findAll({
      where: { is_delete: 0, $or: [{ op_asset_id: req.query.asset_id }, { target_id: req.query.asset_id }] },
      order: [['charge_time', 'ASC']],
    }).then(data => {
      callback(null, data)
    }).catch(e => {
      callback(e)
    })
  }

  function findTargetIndex(list, create_time) {
    var findIndex = 0;
    var parseTime = new Date(create_time)
    if (!list.length || parseTime < new Date(list[0])) {
      return -1;
    }
    list.some((ele, index) => {
      if (index !== list.length - 1) {
        if (new Date(list[index].create_time) <= parseTime && parseTime < new Date(list[index + 1].create_time)) {
          findIndex = index
          return true;
        }
      } else {
        findIndex = index
        return true;
      }
    })
    return findIndex
  }


  function formatTrend(results) {
    var target = results[0]
    var charList = results[1]
    var findIndex = findTargetIndex(charList, target.create_time)
    var initIndex = findIndex + 1;
    var profit = target.profit;
    while (initIndex <= charList.length - 1) {
      profit += charList[initIndex].count
    }
    return res.send({
      status: 1,
      data: profit
    });
  }


}