const apiRequest = require('./apiRequest');
const https = require('https');
const { IncomingMessage } = require('http');

jest.mock('https');

test('getLevels, https request status not ok, error returned', () => {
  const responseStream = new IncomingMessage(90);
  responseStream.statusCode = 101;
  https.request.mockImplementationOnce((url, callback) => {
    callback(responseStream);
  });

  expect.assertions(1);
  return apiRequest.getLevels('mock_nuclide').catch(e => expect(e).toMatch('Status not ok'));
});

test('getLevels, https request returns no data code, rejects with Not found', () => {
  const responseStream = new IncomingMessage(90);
  responseStream.statusCode = 200;
  https.request.mockImplementationOnce((url, callback) => {
    callback(responseStream);

    responseStream.emit('data', '0\n');
    responseStream.emit('end');
  });

  expect.assertions(1);
  return apiRequest.getLevels('mock_nuclide').catch(e => expect(e).toMatch('Not found'));
})

test('getLevels, https request returns other data code, rejects with Unknown error', () => {
  const responseStream = new IncomingMessage(90);
  responseStream.statusCode = 200;
  https.request.mockImplementationOnce((url, callback) => {
    callback(responseStream);

    responseStream.emit('data', '5\n');
    responseStream.emit('end');
  });

  expect.assertions(1);
  return apiRequest.getLevels('mock_nuclide').catch(e => expect(e).toMatch('Unknown error'));
})

test('getLevels, https request returns data, data returned', async () => {
  const responseStream = new IncomingMessage(90);
  responseStream.statusCode = 200;
  https.request.mockImplementationOnce((url, callback) => {
    callback(responseStream);

    responseStream.emit('data', 'some,csv,data');
    responseStream.emit('data', 'some,more,csv,data');
    responseStream.emit('end');
  });

  const response = await apiRequest.getLevels('mock_nuclide');

  expect(response).toEqual('some,csv,datasome,more,csv,data');
});
