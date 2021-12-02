import { getUser } from "../services/user.service.js";


export const authenticate = async (req, res, next) => {
  if (req.session.currentUser) {
    try {
      const user = await getUser(req.session.currentUser);
      if (!user) {
        throw Error();
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).send({ msg: "Unauthorized" });
    }
  }
};
