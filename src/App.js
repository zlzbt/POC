import React from 'react';
import config from './config';
import './App.css';
import $ from 'jquery';
import DateTimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

/* const _data = {
    "code": "200",
    "msg": "OK",
    "data": {
        "content": [
            {
                "headUuid": "ff808081717dffa301717dffa6a60000",
                "companyCde": "MM02",
                "stmtRefCde": "1234567890",
                "sapId": 10.0,
                "ccyCde": "USD",
                "ttlAmt": 100.0,
                "locTtlAmt": 10.0,
                "ttlAmtNote": null,
                "note": "备注001",
                "verId": 12.0,
                "status": "DRAFT",
                "createDte": "2020-04-15 21:59:58",
                "createUsr": "张三",
                "recUpdDt": "2020-04-15 21:59:58",
                "recUpdUsr": "张三"
            },
            {
                "headUuid": "ff808081717d065a01717d065eb10000",
                "companyCde": "MM06",
                "stmtRefCde": "3456789012",
                "sapId": 10.0,
                "ccyCde": "USD",
                "ttlAmt": 300.0,
                "locTtlAmt": 30.0,
                "ttlAmtNote": null,
                "note": "备注003",
                "verId": 12.0,
                "status": "CONFIRM",
                "createDte": "2020-04-14 21:59:58",
                "createUsr": "张三",
                "recUpdDt": "2020-04-14 21:59:58",
                "recUpdUsr": "张三"
            },
            {
                "headUuid": "ff808081717dffa301717dffa6a60000",
                "companyCde": "MM06",
                "stmtRefCde": "1234567890",
                "sapId": 10.0,
                "ccyCde": "USD",
                "ttlAmt": 100.0,
                "locTtlAmt": 10.0,
                "ttlAmtNote": null,
                "note": "备注001",
                "verId": 12.0,
                "status": "DRAFT",
                "createDte": "2020-04-15 21:59:58",
                "createUsr": "张三",
                "recUpdDt": "2020-04-15 21:59:58",
                "recUpdUsr": "张三"
            },
            {
                "headUuid": "ff808081717dffa301717dffa6a60000",
                "companyCde": "MM06",
                "stmtRefCde": "1234567890",
                "sapId": 10.0,
                "ccyCde": "USD",
                "ttlAmt": 100.0,
                "locTtlAmt": 10.0,
                "ttlAmtNote": null,
                "note": "备注001",
                "verId": 12.0,
                "status": "DRAFT",
                "createDte": "2020-04-15 21:59:58",
                "createUsr": "张三",
                "recUpdDt": "2020-04-15 21:59:58",
                "recUpdUsr": "张三"
            },
            {
                "headUuid": "ff808081717d065a01717d065eb10000",
                "companyCde": "MM06",
                "stmtRefCde": "3456789012",
                "sapId": 10.0,
                "ccyCde": "USD",
                "ttlAmt": 300.0,
                "locTtlAmt": 30.0,
                "ttlAmtNote": null,
                "note": "备注003",
                "verId": 12.0,
                "status": "CONFIRM",
                "createDte": "2020-04-14 21:59:58",
                "createUsr": "张三",
                "recUpdDt": "2020-04-14 21:59:58",
                "recUpdUsr": "张三"
            }
        ],
        "totalElements": 7,
        "totalPages": 2,
        "page": 0,
        "size": 5
    }
}
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            dataInfo: []
        };
    }

    componentDidMount = () => {
        // 获取全部数据
        this.getAllDataList('first')
    };

    getParams = (params) => {
        const createDteStr = this.state.startDate;
        if (createDteStr) {
            params.createDteStr = createDteStr;
        }
        const createDteEnd = this.state.endDate;
        if (createDteEnd) {
            params.endDate = createDteEnd;
        }
        const companyCde = $('#company').val();
        if (companyCde) {
            params.companyCde = companyCde;
        }
        const status = $('#status').val();
        if (status) {
            params.status = status;
        }
        const createUsr = $('.createAtInput').val();
        if (createUsr) {
            params.createUsr = createUsr;
        }
        const headUuid = $('.reconciliationText').val();
        if (headUuid) {
            params.headUuid = headUuid;
        }
        const note = $('.remarksText').val();
        if (note) {
            params.note = note;
        }
        return params;
    }

    // 获取所有数据
    getAllDataList = (flag) => {
        const url = config.url.queryPocInfoAll;
        let params = {};
        if(flag !== 'first'){
            params = this.getParams(params);
        }
        axios.post.apply(null, [url, params]).then(feed => {
            const dataInfo = feed;
            this.setState({dataInfo})
        })
    }

    // 获取选中的tr数量
    getCheckedCount = () => {
        const trs = $('#dataInfo').find('tr');
        const checkedArr = [];
        for(var i = 0; i< trs.length; i++){
            const judgeIsCheck = $(trs[i]).find('input').is(":checked");
            if (judgeIsCheck) {
                checkedArr.push(trs[i]);
            }
        }
        return checkedArr;
    }

    paddingZero = function(dd, length){
        if(typeof(dd)==='number'){
            dd = String(dd);
        }else if(typeof(dd)!=='string'){
            return;
        }
        if(!length){
            length = 2;
        }
        var diff = length - dd.length;
        while(diff > 0){
            diff--;
            dd = '0' + dd;
        }
        return dd;
    };

    // 格式化时间
    date2string = function(date, precise) {
        if(!date || !(date instanceof Date)){
            return '';
        }
        var yyyy = date.getFullYear().toString()
            , mm = (date.getMonth()+1).toString() // getMonth() is zero-based
            , dd  = date.getDate().toString();
        var ms = date.getMilliseconds().toString();
        var rtn = yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
        if(!precise){
            return rtn;
        }
        var hh = date.getHours().toString()
            , mi = date.getMinutes().toString()
            , ss = date.getSeconds().toString();
        if(precise === 'mi'){ //精确到分
            rtn += ' '+ (hh[1]?hh:"0"+hh[0])+':'+(mi[1]?mi:"0"+mi[0]);
            return rtn;
        }else if(precise === 'ss'){ //精确到秒
            rtn += ' '+ (hh[1]?hh:"0"+hh[0])+':'+(mi[1]?mi:"0"+mi[0])+':'+(ss[1]?ss:"0"+ss[0]);
            return rtn;
        }else if(precise === 'ms'){
            rtn += ' '+ (hh[1]?hh:"0"+hh[0])+':'+(mi[1]?mi:"0"+mi[0])+':'+(ss[1]?ss:"0"+ss[0]) + '.' + this.paddingZero(ms, 3);
        }
        return rtn;
    };

    // 多选框
    checkAll = (flag, evt) => {
        const input = evt.target;
        const isChecked = $(input).is(":checked");
        if (isChecked) {
            $(input).parent().addClass('checked');
        } else {
            $(input).parent().removeClass('checked');
        }
        const trs = $('#dataInfo').find('tr');
        if (flag === 'all') {
            for (var i = 0; i < trs.length; i++) {
                const td = $(trs[i]).find('td').get(0);
                if (isChecked) {
                    $(td).find('.checkBox').addClass('checked');
                } else {
                    $(td).find('.checkBox').removeClass('checked');
                }
                $(td).find('input').prop("checked", isChecked);
            }
        }
        const checkedArr = this.getCheckedCount()
        if (checkedArr.length > 0) {
            $('.edit').removeClass('hidden');
        } else {
            $('.edit').addClass('hidden');
        }
        if (flag !== 'all') {
            const thisCheckInfo = $(input).parents('tr').data('info');
            const thisCheckInfoObj = JSON.parse(decodeURIComponent(thisCheckInfo));
            this.setState({ thisCheckInfoObj })
        }
    };

    // 控制模态框是否展示
    setIsShowModal = (flag, isEditOrAdd) => {
        const checkedArr = this.getCheckedCount()
        if (checkedArr.length > 1) {
           return alert('一次只可编辑一条信息');
        }
        const trs = $('#dataInfo').find('tr');
        let thisCheckInfoObj = null;
        for (var i = 0; i < trs.length; i++) {
            const td = $(trs[i]).find('td').get(0);
            const isChecked = $(td).find('input').is(":checked");
            if (isChecked) {
                thisCheckInfoObj = JSON.parse(decodeURIComponent($(trs[i]).data('info')));
                break;
            } else {
                continue;
            }
        }
        this.setState({ isShowModal: flag , isEditOrAdd, thisCheckInfoObj});
    }

    // 清空所有的查询条件
    clearQueryCriteria = () => {
        $('.remarksText').val('');
        $('.reconciliationText').val('');
        $('#company').val('');
        $('#status').val('');
        $('.createAtInput').val('');
        this.setState({startDate: '', endDate: ''})
    }

    // 查询数据  分页 或者 精确查询
    queryPocInfo = flag => {
        let params = {};
        const dataObj = (this.state.dataInfo || {}).data || {};
        let page = dataObj.page;  //第几页
        const totalPages = dataObj.totalPages;  //总页数
        let url = config.url.queryPocInfoAll;
        if(flag === 'next'){
            page +=1;
            if(page > totalPages - 1){
                return alert('已经是最后一页了');
            }
        }else if(flag === 'before'){
            page -=1;
            if(page < 0){
                return alert('已经是第一页了');
            }
        }else{ //查询按钮
            params = this.getParams(params);
            url = config.url.queryPocInfo
        }
        // 发起后台请求  START
        params.page = page; //当前页数
        
        axios.post.apply(null, [url, params]).then(feed => {
            const dataInfo = feed;
            this.setState({dataInfo})
        })
        // 发起后台请求 END
    }

    // 修改记录状态为 CANCEL
    delPocInfo = () => {
        const dataInfo = this.state.dataInfo;
        const dataList = dataInfo.data.content;
        const getCheckedCount = this.getCheckedCount();
        if(getCheckedCount.length > 1){
            return alert('一次只能修改一条数据');
        }
        const rowIndex = getCheckedCount[0].rowIndex;
        dataList[rowIndex - 1].status = 'CANCEL';
        dataInfo.data.content = dataList;
        // this.setState({ isShowModal: false, dataInfo });
        const url = config.url.updateStatus
        const params = {};
        params.status = 'CANCEL';
        axios.post.apply(null, [ url, params]).then(feed => {
            const dataInfo = feed;
            this.setState({ isShowModal: false, dataInfo });
        })
    }

    // 新增 或 保存 数据  或 更新状态
    addOrEditPocInfo = (flag) => {
        const isEditOrAdd = this.state.isEditOrAdd;
        const dataInfo = this.state.dataInfo;
        const dataList = dataInfo.data.content;
        const companyCde = $('.company').val(); //公司
        const ccyCde = $('#ccyCde').val(); //币种
        const stmtRefCde = $('.stmtRefCde').val(); //对账单号
        const sapId = $('input.sapId').val();  //付款单位
        const ttlAmt = $('input.ttlAmtInput').val(); //金额
        const locTtlAmt = $('input.locTtlAmt').val(); //本币金额
        const note = $('textarea.remark').val(); //备注
        let params = {};
        const data = {companyCde, ccyCde, stmtRefCde, sapId, ttlAmt, locTtlAmt, note};  //新增 或 修改 数据 
        if(isEditOrAdd === 'add'){ //新增
            dataList.unshift(data);
            dataInfo.data.content = dataList;
            dataInfo.data.totalElements = dataInfo.data.totalElements + 1;
            // this.setState({ isShowModal: false, dataInfo});
            // 往后台发起请求  添加数据
            const url = '';
            params = data;
            axios.post.apply(null, [url, params]).then(feed => {
                const dataInfo = feed;
                this.setState({ isShowModal: false, dataInfo});
            })
        }else if(isEditOrAdd === 'edit'){  //修改信息并保存
            const getCheckedCount = this.getCheckedCount() || [];
            const rowIndex = getCheckedCount[0].rowIndex;
            if(flag === 'save'){
                params = data;
                params.headUuid = dataList[rowIndex-1].headUuid;
                const companyCde = $('.company').val();
                dataList[rowIndex-1].companyCde = companyCde;
                dataList[rowIndex-1].ccyCde = ccyCde;
                dataList[rowIndex-1].stmtRefCde = stmtRefCde;
                dataList[rowIndex-1].sapId = sapId;
                dataList[rowIndex-1].ttlAmt = ttlAmt;
                dataList[rowIndex-1].locTtlAmt = locTtlAmt;
                dataList[rowIndex-1].note = note;
                dataInfo.data.content = dataList;
            }else if(flag === 'del'){  //修改状态 
                params.headUuid = dataList[rowIndex-1].headUuid;
                params.status = 'CANCEL';
                dataList[rowIndex-1].status = 'CANCEL';
                dataInfo.data.content = dataList;
            }else if(flag === 'confirm'){
                params.headUuid = dataList[rowIndex-1].headUuid;
                params.status = 'CONFIRM';
                dataList[rowIndex-1].status = 'CONFIRM';
                dataInfo.data.content = dataList;
            }
            // this.setState({ isShowModal: false, dataInfo});
            const url = config.url.updateStatus;
            axios.post.apply(null, [ url, params]).then(feed => {
                const dataInfo = feed;
                this.setState({ isShowModal: false, dataInfo});
            })
        }
    }

    handleChange1 = date => {
        this.setState({startDate: date});
    };

    handleChange2 = date => {
        this.setState({endDate: date});
    };

    // 币种 金额 失去焦点 拼接 TTL_AMT_NOTE
    setTTL_AMT_NOTE = () => {
        const ccyCde = $('#ccyCde').val();
        const ttlAmt = $('.ttlAmtInput').val();
        if(ccyCde + ttlAmt){
            this.setState({TTL_AMT_NOTE: ccyCde + ttlAmt})
        }
    }
    
    render() {
        const dataObj = (this.state.dataInfo || {}).data || {};
        const dataList = dataObj.content || [];
        const totalElements = dataObj.totalElements;  //总条数
        const totalPages = dataObj.totalPages;  //总页数
        const page = dataObj.page;  //第几页
        const size = dataObj.size;  //当前页面的数量
        const isShowModal = this.state.isShowModal;
        const startDate = this.state.startDate;
        const endDate = this.state.endDate;
        const thisCheckInfoObj = this.state.thisCheckInfoObj || {};
        const TTL_AMT_NOTE1 = this.state.TTL_AMT_NOTE;
        const TTL_AMT_NOTE = thisCheckInfoObj.ccyCde + thisCheckInfoObj.ttlAmt || '';
        return <div className="container-fluid">
            {/* modal START */}
            {isShowModal ? <div className="modal fade in" id="addNewPocInfoModal" role="dialog"
                aria-labelledby="addNewPocInfoModalLabel" aria-hidden="true" style={{ display: 'block', paddingLeft: '17px' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{ border: 'none' }}>
                        <div className="modal-header">
                            <button className="btn btn-sm btn-danger" style={{ float: "right" }} onClick={this.setIsShowModal.bind(this, false)}>关闭</button>
                            <h4 className="modal-title" id="addNewPocInfoModalLabel">催账中心POC</h4>
                        </div>
                        <div className="modal-body addNewPocInfoInfoDiv">
                            <div>
                                <span>公司</span>
                                <select className="form-control company" defaultValue={thisCheckInfoObj.companyCde}>
                                    <option value="">请选择公司</option>
                                    <option value="MM01">MM01</option>
                                    <option value="MM02">MM02</option>
                                    <option value="MM03">MM03</option>
                                    <option value="MM04">MM04</option>
                                    <option value="MM05">MM05</option>
                                    <option value="MM06">MM06</option>
                                </select>
                            </div>
                            <div>
                                <span>币种</span>
                                <select id="ccyCde" className="form-control" defaultValue={thisCheckInfoObj.ccyCde} onChange={this.setTTL_AMT_NOTE.bind()}>
                                    <option value="">请选择币种</option>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                    <option value="CNY">CNY</option>
                                </select>
                            </div>
                            <div>
                                <span className="note">对账单号</span>
                                <textarea className="form-control stmtRefCde" defaultValue={thisCheckInfoObj.stmtRefCde}></textarea>
                            </div>
                            <div>
                                <span className="sapId">付款单位</span>
                                <input className="form-control sapId" defaultValue={thisCheckInfoObj.sapId}/>
                            </div>
                            <div>
                                <span className="ttlAmt">金额</span>
                                <input className="form-control ttlAmtInput" defaultValue={thisCheckInfoObj.ttlAmt} onBlur={this.setTTL_AMT_NOTE.bind()}/>
                            </div>
                            <div>
                                <span className="locTtlAmt">本币金额</span>
                                <input className="form-control locTtlAmt" defaultValue={thisCheckInfoObj.locTtlAmt} />
                            </div>
                            <div>
                                <span className="TTL_AMT_NOTE">TTL_AMT_NOTE</span>
                                <input className="form-control" disabled value={TTL_AMT_NOTE1 ? TTL_AMT_NOTE1 : TTL_AMT_NOTE}/>
                            </div>
                            <div>
                                <span className="note">note</span>
                                <textarea className="form-control remark" defaultValue={thisCheckInfoObj.note} ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ width: '100%', left: 'inherit' }}>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.setIsShowModal.bind(this, false)}>取消</button>
                            <button className="btn btn-sm btn-danger" onClick={this.addOrEditPocInfo.bind(this, 'del')}>删除</button>
                            <button className="btn btn-sm btn-primary" onClick={this.addOrEditPocInfo.bind(this, 'save')}>保存</button>
                            <button className="btn btn-sm btn-primary" onClick={this.addOrEditPocInfo.bind(this, 'confirm')}>确认</button>
                        </div>
                    </div>
                </div>
            </div> : ''}
            {/* modal END */}
            <div className="btnDiv">
                <button className="btn btn-sm btn-primary">首页</button>
                <button className="btn btn-sm btn-warning">周计划查询 X</button>
            </div>
            {/* 基础查询条件输入处 */}
            <div className="queryCriteria">
                <div className='queryBtn'>
                    <span className="span span-primary">基础查询</span>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-3">
                        <div className="row">
                            <span className="col-xs-12 col-md-3 createDate">创建日期</span>
                            <div className="col-xs-12 col-md-4 noPadding">
                            <DateTimePicker className="timeInput form-control" selected={startDate} onChange={this.handleChange1.bind(this)}/>
                            </div>
                            <div className="col-xs-12 col-md-1 noPadding" style={{ width: '4%', marginTop: '5px' }}> ~ </div>
                            <div className="col-xs-12 col-md-4 noPadding">
                            <DateTimePicker className="timeInput form-control" selected={endDate} onChange={this.handleChange2.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <span className='company'>公司</span>
                        <select id="company" className="form-control">
                            <option value="">请选择公司</option>
                            <option value="MM02">MM02</option>
                            <option value="MM03">MM03</option>
                            <option value="MM04">MM04</option>
                            <option value="MM05">MM05</option>
                            <option value="MM06">MM06</option>
                        </select>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <span className='status'>状态</span>
                        <select id="status" className="form-control">
                            <option value="">请选择状态</option>
                            <option value="DRAFT">DRAFT</option>
                            <option value="CONFIRM">CONFIRM</option>
                            <option value="CANCEL">CANCEL</option>
                        </select>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <span className='createAt'>创建人</span>
                        <input className="form-control createAtInput" type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-3">
                        <span className="col-xs-12 col-md-3 reconciliation">对账单号</span>
                        <textarea className="form-control reconciliationText" style={{ width: '71%' }}></textarea>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        <span className="col-xs-12 col-md-4 remarks">备注</span>
                        <textarea className="form-control remarksText" style={{ width: '59%' }}></textarea>
                    </div>
                </div>
            </div>

            {/* 操作按钮 */}
            <div className="operate">
                <button className="btn btn-sm btn-primary" onClick={this.setIsShowModal.bind(this, true, 'add')}>新建</button>
                <button className="btn btn-sm btn-primary hidden edit" onClick={this.setIsShowModal.bind(this, true, 'edit')}>编辑</button>
                <button className="btn btn-sm btn-danger hidden edit" onClick={this.delPocInfo.bind()}>删除</button>
                <button className="btn btn-sm btn-danger" style={{ float: 'right' }} onClick={this.clearQueryCriteria.bind()}>清空</button>
                <button className="btn btn-sm btn-primary" style={{ float: 'right' }} onClick={this.queryPocInfo.bind()}>查询</button>
            </div>

            {/* 数据 表格 */}
            <div className="data">
                <table>
                    <thead className="dataHead">
                        <tr>
                            <th>
                                <div className="checkBox" onClick={this.checkAll.bind(this, 'all')}>
                                    <input type="checkbox" />
                                    <i className="fa fa-check"></i>
                                </div>
                            </th>
                            <th>应收账单UUID</th>
                            <th>CORIS公司</th>
                            <th>应收账单号</th>
                            <th>付款单位</th>
                            <th>币种CNY、USD、EUR等</th>
                            <th>金额</th>
                            <th>本币金额</th>
                            <th>账单金额合计</th>
                            <th>备注</th>
                            <th>创建日期</th>
                            <th>创建人</th>
                            <th>状态</th>
                            <th>Hibernate版本</th>
                            <th>记录更新时间</th>
                            <th>记录更新人员</th>
                        </tr>
                    </thead>
                    <tbody id="dataInfo">
                        {dataList.map((elem, idx) => {
                            return <tr key={`${idx}dataInfo`} data-info={encodeURIComponent(JSON.stringify(elem))}>
                                <td>
                                    <div className="checkBox" onClick={this.checkAll.bind(this, 'single')}>
                                        <input type="checkbox" /><i className="fa fa-check"></i>
                                    </div>
                                </td>
                                <td>{elem.headUuid}</td>
                                <td>{elem.companyCde}</td>
                                <td>{elem.stmtRefCde}</td>
                                <td>{elem.sapId}</td> 
                                <td>{elem.ccyCde}</td>
                                <td>{elem.ttlAmt}</td>
                                <td>{elem.locTtlAmt}</td>
                                <td>{elem.ccyCde + elem.ttlAmt}</td>
                                <td>{elem.ttlAmtNote || elem.note}</td>
                                <td>{elem.createDte}</td>
                                <td>{elem.createUsr}</td>
                                <td>{elem.status}</td>
                                <td>{elem.verId}</td>
                                <td>{elem.recUpdDt}</td>
                                <td>{elem.recUpdUsr}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="pageDown">
                    <span className="count">{page + 1} / {totalPages}</span>
                    <span className="before" onClick={this.queryPocInfo.bind(this, 'before')}>
                        <i className="fa fa-chevron-left"></i>
                    </span>
                    当前页条数 <span className="page"> {size}</span> 
                    <span className="next" onClick={this.queryPocInfo.bind(this, 'next')}>
                        <i className="fa fa-chevron-right"></i>
                    </span>
                    <span>总条数 {totalElements}</span>
                </div>
            </div>
        </div>
    }
}