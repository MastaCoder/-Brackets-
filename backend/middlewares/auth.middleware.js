import { User } from "../models/user.model";


export const authenticate = (req, res, next) => {
  if (req.session.currentUser) {
    try {
      const user = await User.findById(req.session.currentUser);
      if (!user) {
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
