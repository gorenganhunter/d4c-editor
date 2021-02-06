import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
  track: { position: "relative", flexGrow: 1, maxWidth: 600, },
  panel: { width: "100%", position: "absolute", bottom: 0, willChange: "transform" },
  layer: { width: "100%", height: "100%", position: "absolute", pointerEvents: "none", },
}))

export const useNoteStyles = makeStyles(theme => ({
  note: {
    transform: "translateY(50%) scale(1.2)", width: "10%", position: "absolute",
    pointerEvents: "auto", minHeight: "10px",
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
  selection: {
    position: "absolute", pointerEvents: "none", background: "gray",
    opacity: 0.3, border: "2px solid rgba(80, 182, 255, 0.8)"
  }
}))