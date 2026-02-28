
const validatePreferences = (req, res, next) => {
  const { categories, languages } = req.body;
  console.log('validatePreferences', req.user)
  const allowedFields = ["categories", "languages"];
  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Only categories and languages are allowed"
    });
  }

  if (categories !== undefined && !Array.isArray(categories)) {
    return res.status(400).json({
      success: false,
      message: "Categories must be an array"
    });
  }

  if (languages !== undefined && !Array.isArray(languages)) {
    return res.status(400).json({
      success: false,
      message: "Languages must be an array"
    });
  }

  next();
};

module.exports = validatePreferences;