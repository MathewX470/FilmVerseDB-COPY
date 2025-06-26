const favoriteUtils = {
  check: ({ listFavorites, mediaId, mediaType }) => {
    if (!listFavorites) return false;
    return (
      listFavorites.find(
        (e) =>
          e.mediaId.toString() === mediaId.toString() &&
          e.mediaType === mediaType
      ) !== undefined
    );
  },
};

export default favoriteUtils;
