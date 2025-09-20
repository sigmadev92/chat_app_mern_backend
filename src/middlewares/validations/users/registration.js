import Joi from "joi";
import CustomError from "../../errorHandler.js";

const validateRegData = (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return next(new CustomError(400, "Missing credentials"));
  }

  const schema = Joi.object({
    fullName: Joi.string()
      .pattern(/^[A-Za-z]{2,}\s+[A-Za-z]{2,}.*$/)
      .message(
        "Full name must contain at least two words separated by space, each with at least 2 characters."
      )
      .required(),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    password: Joi.string()
      .pattern(/^[A-Za-z0-9@#]{8,12}$/)
      .message(
        "Password must be 8-12 characters long and can only contain letters, numbers, @, and #."
      )
      .required(),
    test: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  req.body.test = true;
  next();
};

export default validateRegData;
