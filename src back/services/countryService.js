const countryRepository = require('../repositories/countryRepository');

async function listCountries() {
  return await countryRepository.findAll();
}

async function listActiveCountries() {
  return await countryRepository.findActive();
}

module.exports = {
  listCountries,
  listActiveCountries
};