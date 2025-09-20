export default class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log("Handled error");
    console.log(err.code, err.message);
    return res.status(err.code).send({ success: false, message: err.message });
  }
  console.log("unhandled error");
  console.log(err);
  res.status(500).send({ success: false, message: "Internal Server Error" });
};
