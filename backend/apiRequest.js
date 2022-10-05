var https = require('https');

const parseErrorCode = (code) => {
  if (code == 0) {
    return 'Not found';
  }
  return 'Unknown error';
}

const get = (field, nuclide) => {
  return new Promise((resolve, reject) => {
    let req = https.request(`https://nds.iaea.org/relnsd/v0/data?fields=${field}&nuclides=${nuclide}`, (res) => {
      if (res.statusCode != 200) {
        reject(new Error('Status not ok'));
      }

      res.setEncoding('utf8');
      let data = [];
      res.on('data', (chunk) => {
        if (chunk.length == 2) {
          reject(new Error(parseErrorCode(chunk)));
        }
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(data);
      });
    });
    
    req.on('error', (e) => {
      reject(e);
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