exports.isDevelop = false; // 打包时需设为 false
const localUrl = window.location.href
module.exports.url = {
    queryPocInfoAll: localUrl + 'cbsarchklist/pageAll',  //查询 所有记录
    queryPocInfo: localUrl + 'cbsarchklist/findOne',  //查询 一条记录
    savePocInfo: localUrl + 'cbsarchklist/saveOne',  //保存 或新增 一条记录  headUuid 空为新增，非空为更新
    updateStatus: localUrl + 'cbsarchklist/updateStatus'  //更新状态
}
