const Settings = require("../src/ytVideoLink");

const updateYoutubeVideo = async (req, res) => {
  try {
    const { youtubeVideoUrl } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({ youtubeVideoUrl });
    } else {
      settings.youtubeVideoUrl = youtubeVideoUrl;
      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      settings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getYoutubeVideo = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(200).json({
      success: true,
      videoUrl: settings?.youtubeVideoUrl || ""
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateYoutubeVideo,
  getYoutubeVideo
};