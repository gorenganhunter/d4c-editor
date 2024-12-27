import React from "react"
import Fade from "@mui/material/Fade"
import Box from "@mui/material/Box"
import { useHashRoutes } from "../routes"
import { makeStyles } from "@mui/material/styles"

const useStyles = makeStyles(theme => ({
  content: { flexGrow: 1, position: "relative", overflow: "hidden", },
  wrapping: {
    width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto",
    "-webkit-overflow-scrolling": "touch", position: "absolute"
  }
}))

const MainContent = () => {

  const cn = useStyles()
  const [path, Component] = useHashRoutes()

  return (
    <Fade in key={path}>
      <Box className={cn.content}>
        <Box className={cn.wrapping}>
          <Component />
        </Box>
      </Box>
    </Fade>)
}


export default MainContent