import { Box } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "0 8px",
      }}
    >
      {medias.map((media, index) => (
        <Box key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Box>
      ))}
    </Box>
  );
};

export default MediaGrid;
