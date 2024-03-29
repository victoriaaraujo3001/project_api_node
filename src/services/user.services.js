const md5 = require("md5");
const users = require("../schemas/users");
const tokenServices = require("../services/token.services");

class UserServices {
  async InsertUserService({ login, email, password, nome, tel }) {
    const encryptedPassword = md5(password);

    const findUser = await users.findOne({
      where: {
        login: login,
        email: email,
        password: encryptedPassword,
        nome: nome,
        telefone: tel,
        status: "1",
      },
    });

    if (findUser == null) {
      const user = await users.create({
        login: login,
        email: email,
        password: encryptedPassword,
        nome: nome,
        telefone: tel,
        status: "1",
      });
      return { login: user.login, email: user.email };
    } else {
      return { dados: true };
    }
  }
  async FindByUser({ login, password }) {
    const encryptedPassword = md5(password);

    const uniqueUser = await users.findOne({
      where: { login: login, password: encryptedPassword },
    });

    const token = await tokenServices.generateToken({
      id_user: uniqueUser.id,
      login: uniqueUser.login,
    });

    return { user: { id: uniqueUser.id, login: uniqueUser.login }, token };
  }
  async AllUser(){
    const allUsers = await users.findAndCountAll()
    return allUsers;
  }
}

module.exports = new UserServices();
