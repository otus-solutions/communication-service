const request = require('supertest');
const server = require('../../config/server');

describe('CommunicationRest.js Tests', () => {

  test('/api/communication', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "sendMail").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .post('/api/communication')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.sendMail).toBeCalledTimes(1);
  });

  test('/api/create-communication', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "create").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .post('/api/create-communication')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.create).toBeCalledTimes(1);
  });

  test('/api/find-communication/', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "get").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .get('/api/find-communication/5e17cab5b613222e9d19a76e')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.get).toBeCalledTimes(1);
  });

  test('/api/get-all-communication', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "getAll").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .get('/api/get-all-communication')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.getAll).toBeCalledTimes(1);
  });

  test('/api/update-communication', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "update").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .put('/api/update-communication')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.update).toBeCalledTimes(1);
  });

  test('/api/delete-communication', async () => {
    jest.spyOn(server.app.controllers.CommunicationController, "delete").mockImplementation(()=>{
      return Promise.resolve({code:200,body:{}})
    });
    await request(server)
      .delete('/api/delete-communication/5e17cab5b613222e9d19a76e')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(server.app.controllers.CommunicationController.delete).toBeCalledTimes(1);
  });
});
