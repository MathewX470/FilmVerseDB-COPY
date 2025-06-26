import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import personApi from "../../api/modules/person.api";
import MediaItem from "./MediaItem";
import { toast } from "react-toastify";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!personId || typeof personId !== "string" || personId.trim() === "") {
      setError("Invalid or missing person ID");
      setLoading(false);
      toast.error("Invalid or missing person ID");
      return;
    }

    const getMedias = async () => {
      setLoading(true);
      setError(null);
      try {
        const { response, err } = await personApi.medias({ personId });
        if (err) throw new Error(err.message);
        if (response && response.cast) {
          const mediasSorted = response.cast.sort(
            (a, b) => getReleaseDate(b) - getReleaseDate(a)
          );
          setMedias([...mediasSorted]);
          setFilteredMedias([...mediasSorted].slice(0, skip));
        } else {
          throw new Error("No media data available");
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date || "")
        : new Date(media.first_air_date || "");
    return date.getTime() || 0;
  };

  const onLoadMore = () => {
    const nextMedias = [...medias].slice(page * skip, (page + 1) * skip);
    setFilteredMedias([...filteredMedias, ...nextMedias]);
    setPage(page + 1);
  };

  if (loading) return <Typography>Loading medias...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          padding: "0 8px",
        }}
      >
        {filteredMedias.map((media, index) => (
          <Box key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Box>
        ))}
      </Box>
      {filteredMedias.length < medias.length && (
        <Box textAlign="center" mt={2}>
          <Button onClick={onLoadMore}>Load More</Button>
        </Box>
      )}
    </>
  );
};

export default PersonMediaGrid;
