function paginationResults(model) {
  return async (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }
    try {
      result.total = await model.count();
      result.data = await model.find().limit(limit).skip(startIndex).exec();
      res.paginationResults = result;
      next();
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = paginationResults;
