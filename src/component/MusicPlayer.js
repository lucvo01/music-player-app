import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
// import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
// import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import useMusicPlayer from "../hooks/useMusicPlayer.js";
// import { useState } from "react";

const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)"
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)"
  }
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)"
}));

export default function MusicPlayer() {
  const {
    trackList,
    currentTrackName,
    playTrack,
    isPlaying,
    playNextTrack,
    playPreviousTrack,
    togglePlay
  } = useMusicPlayer();
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget
        sx={{
          height: "500px",
          width: "300px",
          borderRadius: "70px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Box
          sx={{
            ml: 1.5,
            Width: "66px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center"
            // position: "absolute"
          }}
        >
          <Typography noWrap>{currentTrackName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
            // position: "fixed"
            // justifyContent: "space-around"
          }}
        >
          {trackList.map((track, index) => (
            // ( Surprise us with your code here)
            <Button
              sx={{ mt: "10px", borderRadius: "20px" }}
              variant="outlined"
              className="song-title"
              onClick={() => playTrack(index)}
            >
              {track.name}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <IconButton aria-label="previous song" onClick={playPreviousTrack}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={isPlaying ? "play" : "pause"}
            onClick={togglePlay}
          >
            {!isPlaying ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={playNextTrack}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
      </Widget>
      <WallPaper />
    </Box>
  );
}
