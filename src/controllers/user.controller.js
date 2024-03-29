const UserServices = require("../services/user.services");

class UserControllers {
  async InsertUser(req, res, next) {
    try {
      const user = await UserServices.InsertUserService(req.body);

      if (user.dados == true) {
        return res
          .status(200)
          .send({ message: "Usuario já cadastrado, por favor faça seu login" });
      }

      res.status(201).send({ message: "Usuario criado com sucesso" });
      return user;
    } catch (error) {
      res.status(500 || error.status).send({ message: error.message });
    }
  }

  async FindUser(req, res, next) {
    try {
      const findUser = await UserServices.FindByUser(req.body);

      res.status(200).send(findUser);
    } catch (error) {
      res
        .status(error.status || 404)
        .send({ message: "Usuário não encontrado/inválido" });
    }
  }

  async Users(req, res, next) {
    try {
      const allUsers = await UserServices.AllUser();

      res.status(200).send(allUsers);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: "Ação inválida" });
    }
  }
}

module.exports = new UserControllers();
