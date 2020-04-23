const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//使用异步函数处理Promise
const getHeight = (id) => {//获取某个id元素的高度
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    //选择id
    query.select('#' + id).boundingClientRect(function (res) {
      resolve(res);
    }).exec();
  })
}
//获取某个id的元素的高度
const getDomHeight = (id) => {
  return getHeight(id);
}
/***
 * 判断用户滑动
 * 左滑还是右滑
 */
const getTouchData = (endX, endY, startX, startY) => {
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
    turn = "left";
  }
  return turn;
}


module.exports = {
  formatTime: formatTime,
  getDomHeight: getDomHeight,
  getTouchData: getTouchData
}
