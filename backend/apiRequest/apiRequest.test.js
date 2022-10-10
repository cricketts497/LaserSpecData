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

