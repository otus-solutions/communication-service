const request = require('supertest');
const server = require('../../config/server');

describe('ProjectCommunicationRest_Suite_Tests', () => {

  const BASE_URL = '/api/project-communication';
  const ISSUE_ID = 'x1QJAXMBWwgW4b7GawUj';
  const GROUP_ID = '2';
  const MESSAGE_ID = "yVRrAXMBWwgW4b7GbAU7";

  function _setSpyOn(controllerMethod){
    jest.spyOn(server.app.controllers.ProjectCommunicationController, controllerMethod)
        .mockImplementation(()=>{
          return Promise.reject({code:500,body: {}})
        });
  }

  async function _spyCtrlMethodAndSendPostRequest(controllerMethod, urlSuffix){
    _setSpyOn(controllerMethod);
    await request(server)
        .post(BASE_URL + urlSuffix)
        .expect(500);
  }

  async function _spyCtrlMethodAndSendPutRequest(controllerMethod, urlSuffix){
    _setSpyOn(controllerMethod);
    await request(server)
        .put(BASE_URL + urlSuffix)
        .expect(500);
  }

  async function _spyCtrlMethodAndSendGetRequest(controllerMethod, urlSuffix){
    _setSpyOn(controllerMethod);
    await request(server)
        .get(BASE_URL + urlSuffix)
        .expect(500);
  }

  async function _spyCtrlMethodAndSendDeleteRequest(controllerMethod, urlSuffix){
    _setSpyOn(controllerMethod);
    await request(server)
        .delete(BASE_URL + urlSuffix)
        .expect(500);
  }

  test('/issues', async () => {
    await _spyCtrlMethodAndSendPostRequest("createIssue", '/issues');
    expect(server.app.controllers.ProjectCommunicationController.createIssue).toBeCalledTimes(1);
  });

  test('/issues/:id', async () => {
    await _spyCtrlMethodAndSendGetRequest("getIssuesById", '/issues/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.getIssuesById).toBeCalledTimes(1);
  });

  test('/issues/sender/:id', async () => {
    await _spyCtrlMethodAndSendGetRequest("getIssuesBySender", '/issues/sender/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.getIssuesBySender).toBeCalledTimes(1);
  });

  test('/issues/group', async () => {
    await _spyCtrlMethodAndSendGetRequest("getIssuesByGroup", '/issues/group/'+GROUP_ID);
    expect(server.app.controllers.ProjectCommunicationController.getIssuesByGroup).toBeCalledTimes(1);
  });

  test('/issues/filter', async () => {
    await _spyCtrlMethodAndSendPostRequest("filter", '/issues/filter');
    expect(server.app.controllers.ProjectCommunicationController.filter).toBeCalledTimes(1);
  });

  test('/issues-reopen/:id', async () => {
    await _spyCtrlMethodAndSendPutRequest("openIssue",  '/issues-reopen/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.openIssue).toBeCalledTimes(1);
  });

  test('/issues-close/:id', async () => {
    await _spyCtrlMethodAndSendPutRequest("closeIssue",  '/issues-close/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.closeIssue).toBeCalledTimes(1);
  });

  test('/issues-finalize/:id', async () => {
    await _spyCtrlMethodAndSendPutRequest("finalizeIssue",  '/issues-finalize/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.finalizeIssue).toBeCalledTimes(1);
  });

  test('delete_/issues/:id', async () => {
    await _spyCtrlMethodAndSendDeleteRequest("deleteIssue",  '/issues/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.deleteIssue).toBeCalledTimes(1);
  });

  test('POST_/messages/:issueId', async () => {
    await _spyCtrlMethodAndSendPostRequest("createMessage", '/messages/'+ISSUE_ID);
    expect(server.app.controllers.ProjectCommunicationController.createMessage).toBeCalledTimes(1);
  });

  test('GET_/messages/:issueId', async () => {
    await _spyCtrlMethodAndSendGetRequest("getMessageByIssueId", '/messages/'+MESSAGE_ID);
    expect(server.app.controllers.ProjectCommunicationController.getMessageByIssueId).toBeCalledTimes(1);
  });

  test('GET_/messages/limit/:issueId/:skip/:limit', async () => {
    await _spyCtrlMethodAndSendGetRequest("getMessageByIdLimit", '/messages/limit/1/0/10/');
    expect(server.app.controllers.ProjectCommunicationController.getMessageByIdLimit).toBeCalledTimes(1);
  });

  test('PUT_/messages/:issueId', async () => {
    await _spyCtrlMethodAndSendPutRequest("editTextMessage", '/messages/'+MESSAGE_ID);
    expect(server.app.controllers.ProjectCommunicationController.editTextMessage).toBeCalledTimes(1);
  });

  test('DELETE_/messages/:issueId', async () => {
    await _spyCtrlMethodAndSendDeleteRequest("deleteMessage", '/messages/'+MESSAGE_ID);
    expect(server.app.controllers.ProjectCommunicationController.deleteMessage).toBeCalledTimes(1);
  });

});
