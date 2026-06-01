const newsService = require('../services/newsService');

async function listNews(req, res) {
  try {
    const news = await newsService.listNews(req.user);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNews(req, res) {
  try {
    const news = await newsService.createNews(req.body, req.user);

    res.status(201).json({
      message: 'Noticia creada correctamente',
      news
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateNews(req, res) {
  try {
    const news = await newsService.updateNews(req.params.id, req.body);

    res.json({
      message: 'Noticia actualizada correctamente',
      news
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteNews(req, res) {
  try {
    const result = await newsService.deleteNews(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listPublicNews(req, res) {
  try {
    const news = await newsService.listPublicNews(req.params.countrySlug);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listNews,
  createNews,
  updateNews,
  deleteNews,
  listPublicNews
};