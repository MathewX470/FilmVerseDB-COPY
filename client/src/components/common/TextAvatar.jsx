import { Avatar } from "@mui/material";

const TextAvatar = ({ text }) => {
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const initials = (() => {
    if (!text) return "?";
    const parts = text.split(" ");
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return `${first}${second}`.toUpperCase() || "?";
  })();

  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(text || ""),
        width: 40,
        height: 40,
      }}
    >
      {initials}
    </Avatar>
  );
};

export default TextAvatar;
