import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";
import mongoose from "mongoose";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const userId = req.user.id;

    // Convert favoriteId to ObjectId if it's not already
    if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
      return res.status(400).json({ message: "Invalid favorite ID" });
    }

    const favorite = await favoriteModel.findOne({
      _id: favoriteId,
      user: userId,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.deleteOne();

    return res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    console.error("Error removing favorite:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoritesOfUser };
