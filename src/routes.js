const routes = {
  /* COMMON */
  loginProcess: "/api/loginProcess",
  callCollection: "/api/callCollection",
  getCommonData: "/api/getCommonData",
  getClientInfo: "/api/getClientInfo",

  /* MM0101 */
  getworkStart: "/api/getworkStart",
  getDetailDataToWorkTime: "/api/getDetailDataToWorkTime",
  saveWorkTimeToStart: "/api/saveWorkTimeToStart",
  saveWorkTimeToEnd: "/api/saveWorkTimeToEnd",

  /* MM0102 */
  getAnnualInfo: "/api/getAnnualInfo",

  /* MM0103 */
  getEmpInfo: "/api/getEmpInfo",
  addEmpInfo: "/api/addEmpInfo",
  modifyEmpInfo: "/api/modifyEmpInfo",
  removeEmpInfo: "/api/removeEmpInfo",
  getEmpIdCheck: "/api/getEmpIdCheck",

  /* MM0202 */
  getProjectInfo: "/api/getProjectInfo",
  getProjectWorkListInfo: "/api/getProjectWorkListInfo",
  getEmpList: "/api/getEmpList",
  addWorkList: "/api/addWorkList",
  deleteWorkList: "/api/deleteWorkList",
  changedWorkListStatus: "/api/changedWorkListStatus"
};

export default routes;
