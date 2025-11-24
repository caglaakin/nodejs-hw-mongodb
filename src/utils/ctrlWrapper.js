import createHttpError from 'http-errors';

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      if (err.name === 'CastError' && err.path === '_id') {
        const customError = createHttpError(
          404,
          'Contact not found',
        );
        return next(customError);
      }
      next(err);
    }
  };
};
