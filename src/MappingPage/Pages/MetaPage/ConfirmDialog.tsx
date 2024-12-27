import React from "react"
import Dialog from "@mui/material/Dialog"
import { observable, action } from "mobx"
import { useObserver } from "mobx-react-lite"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { useTranslation } from "react-i18next"
import DialogContentText from "@mui/material/DialogContentText"


const dialog = observable({
  open: false,
  title: "",
  content: "",
  confirm: () => { }
})

export const openConfirm = action((title: string, content: string, confirm: () => void) => {
  dialog.open = true
  dialog.content = content
  dialog.title = title
  dialog.confirm = confirm
})

const ConfirmDialog = () => {

  const { t } = useTranslation()

  return useObserver(() =>
    <Dialog open={dialog.open} onClose={() => dialog.open = false}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialog.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialog.open = false} color="primary" autoFocus>
          {t("Cancel")}
        </Button>
        <Button onClick={() => { dialog.confirm(); dialog.open = false }} color="secondary">
          {t("Reset")}
        </Button>
      </DialogActions>
    </Dialog >)
}

export default ConfirmDialog