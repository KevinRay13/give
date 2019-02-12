const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password, is_admin } = req.body;
    try {
      const db = req.app.get("db");
      const result = await db.find_givers([username]);
      const existingUser = result[0];
      if (existingUser) {
        return res.status(409).send("Username taken");
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const registeredUser = await db.register([is_admin, username, hash]);
      const user = registeredUser[0];
      req.session.user = {
        isAdmin: user.is_admin,
        username: user.username,
        id: user.id
      };
      return res.status(200).send(req.session.user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // getUser: async (req, res) => {
  //   const user = await req.app.get("db").get_user([req.session.user]);
  //   return res.status(200).send(user);
  // },
  getUser: (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ error: "please log in" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await req.app.get("db").find_givers([username]);
    const user = foundUser[0];
    if (!user) {
      return res
        .status(401)
        .send(
          "User  not found. Please register as a new user before logging in."
        );
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password");
    }
    req.session.user = {
      isAdmin: user.is_admin,
      id: user.id,
      username: user.username
    };
    return res.send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  }
};
