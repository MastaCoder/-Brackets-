import { User } from "../models/user.model";

const baseAuthenticate = (req, res, next, userChecker) => {
  if (req.session.currentUser) {
    try {
      const user = await User.findById(req.session.currentUser);
      if (userChecker(user)) {
        throw Error();
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  }
};

const authenticate = (req, res, next) => {
  baseAuthenticate(req, res, next, (user) => !user)
};

const authenticateAdmin = (req, res, next) => {
  baseAuthenticate(req, res, next, (user) => !user || user.type !== "admin")
};
