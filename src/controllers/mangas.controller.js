const mangasServices = require("../services/mangas.services");

class MangasController{
    async FindAllMangas(req, res, next){
        try {
            const mangas = await mangasServices.AllMangas();

            res.status(200).send(mangas)
        } catch (error) {
            res.status(error.status || 500).send({message: error.message})
        }
    }
    async Register(req,res,next){
        try {
            const registeredManga = await mangasServices.RegisterManga(req.body);

            res.status(201).send({message: "Mangá cadastrado com sucesso"})
        } catch (error) {
            res.status(error.status || 500).send({message: error.message})
        }
    }
}

module.exports = new MangasController;