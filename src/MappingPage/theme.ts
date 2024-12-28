import { createTheme } from "@mui/material/styles"
import { red, blue } from "@mui/material/colors"

export const theme = createTheme({
  palette: {
    primary: { main: blue[500], contrastText: "white" },
    secondary: { main: red["A200"] },
    error: red,
    // type: "dark",
    background: { default: "#000", }//paper: "rgba(127,127,127,0.5)" }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
          transition: "color 0.2s"
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
          minWidth: "96px !important"
        }
      }
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: { color: "#fff" }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&$selected": {
            background: "rgb(128,216,255,0.16)",
            "&:hover": {
              background: "rgb(128,216,255,0.16)",
            }
          },
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          height: 2,
          backgroundColor: "rgba(127, 127, 127, 0.5)"
        }
      }
    }
  }
})
