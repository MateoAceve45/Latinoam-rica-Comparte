const countryService = require('../services/countryService');

async function listCountries(req, res) {
  try {
    const countries = await countryService.listCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function listActiveCountries(req, res) {
  try {
    const countries = await countryService.listActiveCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listCountries,
  listActiveCountries
};