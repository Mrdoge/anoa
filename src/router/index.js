import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

/*各种首页*/
import workIndex from '@/page/index/workIndex'        //工作台
import infoIndex from '@/page/info/infoIndex'         //消息首页
import memberListIndex from '@/page/index/memberListIndex'         //通讯录

/*消息模块*/
import infoList from '@/page/info/infoList'         //消息列表
import infoDetail from '@/page/info/infoDetail'         //消息详情

//日报模块
import dailyIndex from '@/page/daily/dailyIndex' //日报首页
import dailyAdd from '@/page/daily/dailyAdd' //新增日报
import dailyDetalis from '@/page/daily/dailyDetalis' //日报详情
import dailyEdit from '@/page/daily/dailyEdit' //日报编辑

//打卡模块
import signIndex from '@/page/sign/signIndex' //打卡首页
import signCount from '@/page/sign/signCount' //打卡统计
import signRuleList from '@/page/sign/signRuleList' //打卡规则
import addsignRule from '@/page/sign/addsignRule' //添加规则

//申请模块
import ApplyPersonnelList from '@/page/apply/ApplyPersonnelList' //人事申请列表页
import ApplyVacation from '@/page/apply/ApplyVacation' //请假申请
import ApplyEntry from '@/page/apply/ApplyEntry' //入职申请
import ApplyTurnOfficial from '@/page/apply/ApplyTurnOfficial' //转正申请
import ApplyLeave from '@/page/apply/ApplyLeave' //离职申请
import ApplyTransfer from '@/page/apply/ApplyTransfer' //调动申请
import ApplySalaryAdjust from '@/page/apply/ApplySalaryAdjust' //调薪申请

//申请模块编辑
import ApplyVacationEdit from '@/page/apply/ApplyVacationEdit' //请假申请
import ApplyEntryEdit from '@/page/apply/ApplyEntryEdit' //入职申请
import ApplyTurnOfficialEdit from '@/page/apply/ApplyTurnOfficialEdit' //转正申请
import ApplyLeaveEdit from '@/page/apply/ApplyLeaveEdit' //离职申请
import ApplyTransferEdit from '@/page/apply/ApplyTransferEdit' //调动申请
import ApplySalaryAdjustEdit from '@/page/apply/ApplySalaryAdjustEdit' //调薪申请

//合同模块
import contractList from '@/page/contract/contractList' //合同管理首页
import contractDetails from '@/page/contract/contractDetails' //合同管理详情

//个人中心模块
import myIndex from '@/page/myIndex/myIndex'          //个人中心首页
import myApplyIndex from '@/page/myIndex/myApplyIndex'          //我的申请
import myApplyList from '@/page/myIndex/myApplyList'          //我的申请
import myApplyDetails from '@/page/myIndex/myApplyDetails'          //我的申请详情页
import myInfo from '@/page/myIndex/myInfo'          //个人资料页
import myDailyList from '@/page/myIndex/myDailyList'          //我的日报记录页
import mySignList from '@/page/myIndex/mySignList'          //我的打卡记录页
import mySchedule from '@/page/myIndex/mySchedule'          //我的行程
import myTaskList from '@/page/myIndex/myTaskList'          //代办事务
import myTaskDetail from '@/page/myIndex/myTaskDetail'          //代办事务


//项目管理
import projectList from '@/page/project/projectList'      //项目管理首页
import projectAdd from '@/page/project/projectAdd'      //新增项目管理页
import projectDetail from '@/page/project/projectDetail'      //项目详情页


//问题中心
import questionList from '@/page/question/questionList'      //问题中心首页
import questionAdd from '@/page/question/questionAdd'      //新增项目管理页
import questionDetail from '@/page/question/questionDetail'      //问题详情页

//员工档案
import memberDetail from '@/page/member/memberDetail'      //员工详情

//404页面
import page404 from '@/page/index/page404'      //404页面

//设置页面
import settingIndex from '@/page/setting/settingIndex'      //设置首页
import editPassword from '@/page/setting/editPassword'      //设置密码

export default new Router({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {  //每次滚动到会顶部
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '*',                  //404页面
      redirect: '/index/page404'
    },
    {
      path: '/',
      redirect: '/info/infoIndex' //默认到消息页面
    },

    //404页面
    {
      path: '/index/page404',
      name: 'page404',
      component: page404,
      meta:{
        index:6,
        title:"404"
      }
    },

    //工作台
    {
      path: '/index/workIndex',
      name: 'index',
      component: workIndex,
      meta:{
        index:0.2,
        keepAlive: true
      }
    },
    //通讯录
    {
      path: '/index/memberListIndex',
      name: 'memberListIndex',
      component: memberListIndex,
      meta:{
        index:0.3,
        keepAlive: true
      }
    },
    {
      path: '/member/memberDetail/:userId',
      name: 'memberDetail',
      component: memberDetail,
      meta:{
        index:1.2,
        title:"员工档案",
      }
    },
    {
      path: '/info/infoIndex',
      name: 'infoIndex',
      meta:{
        index:0.1
      },
      component: infoIndex
    },

    //消息模块
    {
      path: '/info/infoList/:cateId',
      name: 'infoList',
      meta:{
        index:1.1,
        title:"消息列表",
      },
      component: infoList
    },
    {
      path: '/info/infoDetail/:infoId',
      name: 'infoDetail',
      meta:{
        index:1.2,
        title:"消息详情",
      },
      component: infoDetail
    },

    //日报模块
    {
      path: '/daily/dailyIndex',
      name: 'dailyIndex',
      meta:{
        index:1,
        title:"工作日报",
        isTopCalendarIconShow:true  //顶部日历图标是否显示
      },
      component: dailyIndex
    },
    {
      path: '/daily/dailyAdd',
      name: 'dailyAdd',
      meta:{
        index:1.2,
        title:"写日报"
      },
      component: dailyAdd
    },
    {
      path: '/daily/dailyDetalis/:daId',
      name: 'dailyDetalis',
      meta:{
        index:1.3,
        title:"日报详情"
      },
      component: dailyDetalis
    },
    {
      path: '/daily/dailyEdit/:daId',
      name: 'dailyEdit',
      meta:{
        index:1.3,
        title:"写日报"
      },
      component: dailyEdit
    },

    //打卡模块
    {
      path: '/sign/signIndex',
      name: 'signIndex',
      meta:{
        index:1.1,
        title:"打卡签到"
      },
      component: signIndex
    },
    {
      path: '/sign/signCount',
      name: 'signCount',
      meta:{
        index:1.2,
        title:"打卡统计",
        isTopCalendarIconShow:true  //顶部日历图标是否显示
      },
      component: signCount
    },
    {
      path: '/sign/signRuleList',
      name: 'signRuleList',
      meta:{
        index:1.3,
        title:"打卡规则"
      },
      component: signRuleList
    },
    {
      path: '/sign/addsignRule',
      name: 'addsignRule',
      meta:{
        index:1.4,
        title:"添加规则"
      },
      component: addsignRule
    },

    //申请模块
    {
      path: '/apply/ApplyPersonnelList',
      name: 'ApplyPersonnelList',
      meta:{
        index:1.2,
        title:"人事申请"
      },
      component: ApplyPersonnelList
    },
    {
      path: '/apply/ApplyEntry',
      name: 'ApplyEntry',
      meta:{
        index:1.3,
        title:"入职申请"
      },
      component: ApplyEntry
    },
    {
      path: '/apply/ApplyTurnOfficial',
      name: 'ApplyTurnOfficial',
      meta:{
        index:1.3,
        title:"转正申请"
      },
      component: ApplyTurnOfficial
    },
    {
      path: '/apply/ApplyLeave',
      name: 'ApplyLeave',
      meta:{
        index:1.3,
        title:"离职申请"
      },
      component: ApplyLeave
    },
    {
      path: '/apply/ApplyTransfer',
      name: 'ApplyTransfer',
      meta:{
        index:1.3,
        title:"调动申请"
      },
      component: ApplyTransfer
    },
    {
      path: '/apply/ApplySalaryAdjust',
      name: 'ApplySalaryAdjust',
      meta:{
        index:1.3,
        title:"调薪申请"
      },
      component: ApplySalaryAdjust
    },
    {
      path: '/apply/ApplyVacation',
      name: 'ApplyVacation',
      meta:{
        index:1.3,
        title:"请假申请"
      },
      component: ApplyVacation
    },

    //申请模块编辑
    {
      path: '/apply/ApplyEntryEdit/:index/:id',
      name: 'ApplyEntryEdit',
      meta:{
        index:1.3,
        title:"入职申请编辑"
      },
      component: ApplyEntryEdit
    },
    {
      path: '/apply/ApplyTurnOfficialEdit/:index/:id',
      name: 'ApplyTurnOfficialEdit',
      meta:{
        index:1.3,
        title:"转正申请编辑"
      },
      component: ApplyTurnOfficialEdit
    },
    {
      path: '/apply/ApplyLeaveEdit/:index/:id',
      name: 'ApplyLeaveEdit',
      meta:{
        index:1.3,
        title:"离职申请编辑"
      },
      component: ApplyLeaveEdit
    },
    {
      path: '/apply/ApplyTransferEdit/:index/:id',
      name: 'ApplyTransferEdit',
      meta:{
        index:1.3,
        title:"调动申请编辑"
      },
      component: ApplyTransferEdit
    },
    {
      path: '/apply/ApplySalaryAdjustEdit/:index/:id',
      name: 'ApplySalaryAdjustEdit',
      meta:{
        index:1.3,
        title:"调薪申请编辑"
      },
      component: ApplySalaryAdjustEdit
    },
    {
      path: '/apply/ApplyVacationEdit/:index/:id',
      name: 'ApplyVacationEdit',
      meta:{
        index:1.3,
        title:"请假申请编辑"
      },
      component: ApplyVacationEdit
    },
    

    //合同管理
    {
      path: '/contract/contractList',
      name: 'contractList',
      meta:{
        index:1.2,
        title:"合同管理",
        isTopSearchShow:true
      },
      component: contractList
    },
    {
      path: '/contract/contractDetails/:cId',
      name: 'contractDetails',
      meta:{
        index:1.3,
        title:"合同详情"
      },
      component: contractDetails
    },

    //个人中心
    {
      path: '/myIndex/myIndex',
      name: 'myIndex',
      meta:{
        index:0.4
      },
      component: myIndex
    },
    {
      path: '/myIndex/myApplyIndex',
      name: 'myApplyIndex',
      meta:{
        index:1.1,
        title:"我的申请"
      },
      component: myApplyIndex
    },
    {
      path: '/myIndex/myApplyList/:index',
      name: 'myApplyList',
      meta:{
        index:1.2,
        title:"申请记录"
      },
      component: myApplyList
    },
    {
      path: '/myIndex/myApplyDetails/:index/:id',
      name: 'myApplyDetails',
      meta:{
        index:1.3,
        title:"申请详情"
      },
      component: myApplyDetails
    },
    {
      path: '/myIndex/myInfo',
      name: 'myInfo',
      meta:{
        index:1.1,
        title:"我的资料"
      },
      component: myInfo
    },
    {
      path: '/myIndex/myDailyList',
      name: 'myDailyList',
      meta:{
        index:1.1,
        title:"我的日报"
      },
      component: myDailyList
    },
    {
      path: '/myIndex/mySignList',
      name: 'mySignList',
      meta:{
        index:1.1,
        title:"打卡记录"
      },
      component: mySignList
    },
    {
      path: '/myIndex/mySchedule',
      name: 'mySchedule',
      meta:{
        index:1.1,
        title:"我的行程"
      },
      component: mySchedule
    },
    {
      path: '/myIndex/myTaskList',
      name: 'myTaskList',
      meta:{
        index:1.1,
        title:"待办任务"
      },
      component: myTaskList
    },
    {
      path: '/myIndex/myTaskDetail/:tId',
      name: 'myTaskDetail',
      meta:{
        index:1.3,
        title:"任务详情"
      },
      component: myTaskDetail
    },

    //合同管理
    {
      path: '/project/projectList',
      name: 'projectList',
      meta:{
        index:1.1,
        title:"项目管理"
      },
      component: projectList
    },
    {
      path: '/project/projectAdd/:proId',
      name: 'projectAdd',
      meta:{
        index:1.3,
        title:"上传记录"
      },
      component: projectAdd
    },
    {
      path: '/project/projectDetail/:pro_id',
      name: 'projectDetail',
      meta:{
        index:1.2,
        title:"项目详情"
      },
      component: projectDetail
    },

    //问题中心
    {
      path: '/question/questionList',
      name: 'questionList',
      meta:{
        index:1.1,
        title:"问题中心"
      },
      component: questionList
    },
    {
      path: '/question/questionAdd',
      name: 'questionAdd',
      meta:{
        index:1.3,
        title:"发布问题"
      },
      component: questionAdd
    },
    {
      path: '/question/questionDetail/:qId',
      name: 'questionDetail',
      meta:{
        index:1.2,
        title:"问题详情"
      },
      component: questionDetail
    },

    /**设置**/
    {
      path: '/setting/settingIndex',
      name: 'settingIndex',
      meta:{
        index:1.1,
        title:"设置"
      },
      component: settingIndex
    },
    {
      path: '/setting/editPassword',
      name: 'editPassword',
      meta:{
        index:1.2,
        title:"修改密码"
      },
      component: editPassword
    },
  ]
})