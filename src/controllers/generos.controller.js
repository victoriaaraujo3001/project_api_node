const generosService = require("../services/genre.services");

class GenerosControllers {
  async listGeneros(req, res, next) {
    try {
      const allGeneros = await generosService.GetAllGeneros();
      res.status(200).send(allGeneros);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: error.message, description: error.description });
    }
  }
  async listGenero(req, res, next) {
    try {
      const { id } = req.params;

      const oneGenero = await generosService.GetOneGenero(id);
      res.status(200).send(oneGenero);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: error.message, description: error.description });
    }
  }
  async FilterMangaForGenero(req, res, next) {
    try {
      const { id } = req.params;

      const mangas = await generosService.FilterGenero(id);
      res.status(200).send(mangas);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: error.message, description: error.description });
    }
  }
}

module.exports = new GenerosControllers();
