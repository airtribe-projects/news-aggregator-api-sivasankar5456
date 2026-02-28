const User = require("../models/userModel");

/* =========================
   GET /preferences
========================= */
exports.getPreferences = async (req, res) => {
  console.log('getPreferences called')

  return res.status(200).json({
    success: true,
    preferences: req.user.preferences
  });
};


exports.updatePreferences = async (req, res) => {
  try {
    const { categories, languages } = req.body;

    const updateData = {};

    if (categories !== undefined) {
      updateData["preferences.categories"] = categories;
    }

    if (languages !== undefined) {
      updateData["preferences.languages"] = languages;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      preferences: updatedUser.preferences
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update preferences"
    });
  }
};



// /* =========================
//    POST /preferences
// ========================= */
// exports.updatePreferences = async (req, res) => {
//   try {
//     const { categories, languages } = req.body;

//     if (categories !== undefined) {
//       req.user.preferences.categories = categories;
//     }

//     if (languages !== undefined) {
//       req.user.preferences.languages = languages;
//     }

//     await req.user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Preferences updated successfully",
//       preferences: req.user.preferences
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update preferences"
//     });
//   }
// };

// exports.updatePreferences = async (req, res) => {
//   try {
//     const { categories, languages } = req.body;

//     if (!req.user.preferences) {
//       req.user.preferences = { categories: [], languages: [] };
//     }

//     if (categories) {
//       req.user.preferences.categories = [
//         ...new Set([
//           ...req.user.preferences.categories,
//           ...categories
//         ])
//       ];
//     }

//     if (languages) {
//       req.user.preferences.languages = [
//         ...new Set([
//           ...req.user.preferences.languages,
//           ...languages
//         ])
//       ];
//     }

//     await req.user.save();

//     return res.status(200).json({
//       success: true,
//       preferences: req.user.preferences
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update preferences"
//     });
//   }
// };


