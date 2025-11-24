import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  } else if (err.name === 'CastError' && err.path === '_id') {
    const customError = createHttpError(
      404,
      'The provided ID format is invalid',
    );

    res.status(customError.status).json({
      status: customError.status,
      message: customError.name,
      data: null,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
