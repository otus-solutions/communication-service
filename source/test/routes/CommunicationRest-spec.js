const request = require('supertest');
const server = require('../../config/server');

describe('CommunicationRest.js Tests', () => {
  test('/api/create-randomization', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "sendMail").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .post('/communication')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.sendMail).toBeCalledTimes(1);
  });
});
