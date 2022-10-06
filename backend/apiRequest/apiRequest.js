const https = require('https');

const parseErrorCode = (code) => {
  if (code === '0\n') {
    return 'Not found';
  }
  return 'Unknown error';
}

const get = (field, nuclide) => {
  return new Promise((resolve, reject) => {
    const req = https.request(`https://nds.iaea.org/relnsd/v0/data?fields=${field}&nuclides=${nuclide}`, (res) => {
      if (res.statusCode != 200) {
        reject('Status not ok');
      }

      res.setEncoding('utf8');
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (data.length <= 2) {
          reject(parseErrorCode(data));
        }
        resolve(data);
      });
    });
    
    req.on('error', (e) => {
      reject('Request error');
    });
    
    req.end();
  })
}

exports.getLevels = (nuclide) => {
  return get('levels', nuclide);
}

exports.getGroundStates = (nuclide) => {
  return get('ground_states', nuclide);
}

exports.getGammas = (nuclide) => {
  return get('gammas', nuclide);
}