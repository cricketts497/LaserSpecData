const https = require('https');
const csv = require('csvtojson');

const get = (nuclide, field) => {
  return new Promise((resolve, reject) => {
    const req = https.request(`https://nds.iaea.org/relnsd/v0/data?fields=${field}&nuclides=${nuclide}`, (res) => {
      if (res.statusCode != 200) {
        reject('Status not ok');
      }

      res.setEncoding('utf8');
      resolve(res);
    });
    
    req.on('error', (e) => {
      reject('Request error');
    });
    
    req.end();
  })
}

const getConverted = (nuclide, field, includeColumns) => {
  return new Promise((resolve, reject) => {
    get(nuclide, field)
    .then((res) => {
      const converted = [];
      csv({ includeColumns: includeColumns })
      .fromStream(res).subscribe((line) => {
        converted.push(line);
      },
      (err) => reject('Conversion error'),
      () => {
        if (converted.length === 0) {
          reject('No data');
        }
        resolve(converted);
      });
    })
    .catch((err) => reject(err));
  })
}

exports.getGroundStates = (nuclide) => {
  return getConverted(nuclide, 'ground_states', /\b(z|n|symbol|jp|half_life|unc_hl|unit_hl|radius|unc_r|magnetic_dipole|unc_md|electric_quadrupole|unc_eq)\b/);
}

exports.getLevels = (nuclide) => {
  return getConverted(nuclide, 'levels', /\b(z|n|symbol|jp|idx|energy|unc_e|half_life|unc_hl|unit_hl|magnetic_dipole|unc_mn|electric_quadrupole|unc_eq)\b/);
}

exports.getGammas = (nuclide) => {
  return getConverted(nuclide, 'gammas', /\b(z|n|symbol|start_level_idx|start_level_energy|unc_sle|end_level_idx|end_level_energy|unc_ele)\b/);
}