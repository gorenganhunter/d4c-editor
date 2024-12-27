import React from "react"
import { useObserver } from "mobx-react-lite"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { makeStyles } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import { scope } from "../../../MappingScope/scope"
import { TimeToString } from "../../../Common/utils"
import { TimingState } from "./sharedState"
import Button from "@mui/material/Button"


const useStyles = makeStyles(theme => ({
  table: { maxHeight: "60vh", overflow: "auto", "-webkit-overflow-scrolling": "touch" },
  tablerow: { cursor: "pointer" }
}))

const TimepointTable = () => {

  const cn = useStyles()
  const { t } = useTranslation()
  return useObserver(() =>
    <Table className={cn.table}>
      <TableHead>
        <TableRow>
          <TableCell>{t("Start time")}</TableCell>
          <TableCell>BPM</TableCell>
          <TableCell>{(t("Meter"))}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {scope.map.timepointlist.map(tp => (
          <TableRow key={tp.id} selected={tp.id === TimingState.selected} hover
            onClick={() => TimingState.selected = tp.id === TimingState.selected ? null : tp.id}
            classes={{ root: cn.tablerow }}>
            <TableCell>{TimeToString(tp.time)}</TableCell>
            <TableCell>{tp.bpm}</TableCell>
            <TableCell>{tp.bpb}/4</TableCell>
          </TableRow>))}
      </TableBody>
    </Table>)
}

const removeTp = () => {
  if (TimingState.selected === null) return
  scope.map.removeTimepoint(TimingState.selected, scope.settings.editor.justify_grid_divisor)
  TimingState.selected = null
}
const RemoveBtn = () => {

  const { t } = useTranslation()

  return useObserver(() =>
    <Button color="secondary" disabled={TimingState.selected === null} onClick={removeTp}>
      {t("Remove")}
    </Button>)
}

const LeftPanel = () => {

  const { t } = useTranslation()

  return useObserver(() =>
    <Grid item xs={12} sm container spacing={2} direction="column">
      <Grid item><Typography>{t("Timepoints")}</Typography></Grid>
      <Grid item>
        <TimepointTable />
      </Grid>
      <Grid item>
        <RemoveBtn />
      </Grid>
    </Grid>)
}

export default LeftPanel