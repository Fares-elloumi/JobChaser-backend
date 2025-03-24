import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator"
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface ProtectedRequest extends Request {
  user?: JwtPayload;
}
// Validator
export const validateUser  = [
  body("email").trim().isEmail().escape(),
  body("password").trim().isLength({ min: 5}).escape(),
  (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          res.status(400).json({ message: "Not valid data", errors: errors.array()})
          return
      }
      next();
  }
]


// Middleware för att skydda routes
export const authMiddleware = (req: ProtectedRequest, res: Response, next: NextFunction): void  => {
  const bearerToken = req.headers.authorization?.split(" ")[1];

  if (!bearerToken) {
     res.status(401).json({ message: "Unauthorized, no token" });
     return;
  }

  if (!process.env.JWT_SECRET) {
     res.status(500).json({ message: "JWT SECRET is not defined" });
     return
  }

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
