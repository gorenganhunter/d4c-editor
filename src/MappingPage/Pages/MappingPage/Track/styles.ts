import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  track: { position: "relative", flexGrow: 1, maxWidth: 600, },
  panel: { width: "100%", position: "absolute", bottom: 0, willChange: "transform" },
  layer: { width: "100%", height: "100%", position: "absolute", pointerEvents: "none", },
  paper: { width: "calc(60vw + 200px)" }
}))

export const useNoteStyles = makeStyles(theme => ({
  note: {
    transform: "translateY(50%) scale(1.2)", width: "10%", position: "absolute",
    pointerEvents: "auto", minHeight: "10px",
  },
  overlay: {
    transform: "translateY(50%) scale(1.2)", width: "10%", position: "absolute",
    pointerEvents: "none", minHeight: "10px", backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  noevent: { pointerEvents: "none" },
  slidebar: {
    background: "yellow", opacity: 0.7, width: "10%", position: "absolute", pointerEvents: "auto",
  },
  laser: {
    background: "#ff60a0", opacity: 0.7, width: "1%", position: "absolute", pointerEvents: "auto",
  },
  stop: {
    background: "red", opacity: 0.7, width: "10%", position: "absolute", pointerEvents: "auto",
  },
  slidebardark: {
    background: "rgb(128, 128, 0)", opacity: 0.7, width: "10%", position: "absolute", pointerEvents: "auto",
  },
  laserdark: {
    background: "rgb(128, 48, 80)", opacity: 0.7, width: "1%", position: "absolute", pointerEvents: "auto",
  },
  stopdark: {
    background: "rgb(128, 0, 0)", opacity: 0.7, width: "10%", position: "absolute", pointerEvents: "auto",
  },
  selection: {
    position: "absolute", pointerEvents: "none", background: "gray",
    opacity: 0.3, border: "2px solid rgba(80, 182, 255, 0.8)"
  }
}))
