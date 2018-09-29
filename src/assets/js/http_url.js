let localhostDev = true;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成http://www.gdasjs.com
//let _host= localhostDev ? 'http://anoa.xilide.vip' : 'http://anoa.xilide.vip';
//let _host= localhostDev ? 'http://192.168.1.230/BusinessProject/www.anoa.de' : 'http://www.gdasjs.com';
//let _host= localhostDev ? 'http://192.168.1.222' : 'http://www.gdasjs.com';  //本地打包测试用
let _host= localhostDev ? 'http://192.168.1.230/BusinessProject/www.anoa.de' : 'http://oa.gdasjs.com';

//问题中心接口
const qst = {
    questionList:_host + '/wap/question/questionList',   //问题数据接口
    questionDetail:_host + '/wap/question/questionDetail',   //问题详情
    addQuestion:_host + '/wap/question/addQuestion',   //发布问题
    endQuestion:_host + '/wap/question/endQuestion'   //结束问题
}

//日报接口
const daily = {
    dailyList:_host + '/wap/daily/dailyIndex',   //日报列表
    dailyAdd:_host + '/wap/daily/dailyAdd',   //添加日报
    dailyDetalis:_host + '/wap/daily/dailyDetalis'   //日报详情
}

//我的行程
const mySchedule = {
    mySchedule:_host + '/wap/MyIndex/mySchedule',   //我的行程首页
    myScheduleAdd:_host + '/wap/MyIndex/myScheduleAdd',   //我的行程首页
    delSchedule:_host + '/wap/MyIndex/delSchedule',   //删除我的某条行程
}

//项目管理
const project = {
    projectList:_host + '/wap/project/projectList',   //项目列表
    projectDetail:_host + '/wap/project/projectDetail',   //项目详情
    addProjectRecord:_host + '/wap/project/addProjectRecord',   //项目详情上传记录
    projectFileList:_host + '/wap/project/projectFileList'   //项目文件列表
}

//合同管理
const contract = {
    contractList:_host + '/wap/Contract/contractList',   //合同列表
    ContractDetails:_host + '/wap/Contract/ContractDetails',   //合同详情
    contractAdd:_host + '/wap/contract/contractAdd',   //新增合同
}

//申请
const apply = {
    applyVacation:_host + '/wap/Apply/applyVacation',   //添加请假申请
    applyEntry:_host + '/wap/Apply/applyEntry',   //添加入职申请
    applyLeave:_host + '/wap/Apply/applyLeave',   //添加离职申请
    applyTurnOfficial:_host + '/wap/Apply/applyTurnOfficial',   //添加转正申请
    applyTransfer:_host + '/wap/Apply/applyTransfer',   //添加调任申请
    applySalaryAdjust:_host + '/wap/Apply/applySalaryAdjust',   //添加调薪申请
    applyStatusEdit:_host + '/wap/Apply/applyStatusEdit',   //审批申请通不通过接口

    getUserHistorySelect:_host + '/wap/apply/getUserHistorySelect',   //获取历史审批人
    getLeaverType:_host + '/wap/apply/getLeaverType',   //获取请假类型
}

//打卡
const sign = {
    SignIndex:_host + '/wap/sign/signIndex',   //打卡接口
    signList:_host + '/wap/sign/signList',   //打卡接口
    getServerTime:_host + '/wap/sign/getServerTime', //服务器时间
}

//登录
const login = {
    checkIsLogin:_host + '/wap/member/checkIsLogin',   //判断是否登陆
    login:_host + '/wap/member/login',   //登陆接口
}

//人事,组织架构
const member = {
    getUserOrganization:_host + '/wap/member/getUserOrganization',
    getMemberInfo:_host + '/wap/member/getMemberInfo',
    editMemberDetail:_host + '/wap/member/editMemberDetail'
}

//部门
const section = {
    getAllSectionModel:_host + '/wap/section/getAllSectionModel',
}

//个人中心各种接口（申请）
const my = {
    applyList:_host + '/wap/myIndex/applyList',         //我的申请列表
    applyListWait:_host + '/wap/myIndex/applyListWait', //待批申请列表
    mySignList:_host + '/wap/MyIndex/mySignList', //我的打卡
    myDaily:_host + '/wap/MyIndex/myDaily', //我的日报
}

//消息接口
const info = {
    myInfoList:_host + '/wap/Info/myInfoList',
    infoIndex:_host + '/wap/Info/infoIndex',    //消息首页数据
    infoDetail:_host + '/wap/Info/infoDetail',
    infoCount:_host + '/wap/Info/infoCount',    //是否已读
    editInfoStatus:_host + '/wap/Info/editInfoStatus',    //标记已读接口
}

//待办任务
const task = {
    myTaskList:_host + '/wap/MemberList/MyTaskList',    //待办任务
    mytaskDetail:_host + '/wap/MemberList/MytaskDetail',    //任务详情
    endTask:_host + '/wap/MemberList/endTask',    //结束任务
    addTask:_host + '/wap/MemberList/addTask',    //结束任务
}

//设置
const seting = {
    editPassword:_host + '/wap/system/editPassword',    //修改密码
}

//工作台banner接口
const banner = _host + '/wap/Banner/bannerList'

export default{
    HOST:_host,
    temp: _host + '/template',
    bannerImg: [//banner图片
        _host + '/template/wap/public/img/workindex.jpg',
    ], 
    exampleImg: _host + '/template/wap/public/img/example.jpg', //范文示例图
    imgUpload: _host + '/wap/Upload/imgUpload', //图片上传接口
    loginOut: _host + '/wap/System/loginOut', //退出登良
    editMemberAvatar:_host + '/wap/Member/editMemberAvatar', //头像提交
    qst,
    daily,
    project,
    contract,
    mySchedule,
    sign,
    apply,
    login,
    member,
    section,
    my,
    info,
    task,
    seting,
    banner  //banner接口
}