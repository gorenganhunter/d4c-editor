import React from "react"
import Dialog from "@mui/material/Dialog"
import { observable, action } from "mobx"
import { useObserver } from "mobx-react-lite"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useTranslation } from "react-i18next"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  paper: { width: "calc(60vw + 200px)" }
}))

const dialog = observable({
  open: false,
  content: "",
  title: "",
  copy: ""
})

export const openDialog = action(function (title: string, content: string, copy = content as string) {
  dialog.open = true
  dialog.content = content
  dialog.title = title
  dialog.copy = copy
})

const copy = () => {
  navigator.clipboard.writeText(dialog.copy)
}

const onfocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
  e.target.select()
}

const CopyDialog = () => {

  const cn = useStyles()
  const { t } = useTranslation()

  return useObserver(() =>
    <Dialog open={dialog.open} onClose={() => dialog.open = false} classes={{ paper: cn.paper }}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <TextField autoFocus onFocus={onfocus} fullWidth multiline maxRows={20} variant="outlined" value={dialog.content} />
      </DialogContent>
      <DialogActions>
        <Button onClick={copy} color="primary">
          {t("Copy")}
        </Button>
        <Button onClick={() => dialog.open = false} color="primary">
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog >)
}

export default CopyDialog
