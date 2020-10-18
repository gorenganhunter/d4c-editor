import React from "react"
import Grid from "@material-ui/core/Grid"
import {useTranslation} from "react-i18next"
import Button from "@material-ui/core/Button"
import {openDialog} from "./CopyDialog"
import {userMessage} from "../../../Common/Components/GlobalSnackbar"
import {toBestdoriFormat} from "../../../MapFormats/bestdori"
import {scope} from "../../../MappingScope/scope"
import {openConfirm} from "./ConfirmDialog"
import {openFile, downLoadFile} from "../../../Common/utils"
import {fromBBBv1Format} from "../../../MapFormats/bbbv1"
import {EditMap} from "../../../MappingScope/EditMap"
import i18n from "../../../i18n"
import {Music} from "../../../MappingPage/states"

const importBBBv1 = async () => {
    try {
        const content = await openFile("*")
        scope.reset(fromBBBv1Format(content))
        userMessage(i18n.t("Import success"), "success")
    } catch (error) {
        if (!error) return
        userMessage(i18n.t("Error import"), "error")
        throw error
    }
}

const exportBestdori = () => {
    try {
        const content = toBestdoriFormat((scope.map as any).state)
        openDialog(i18n.t("Export Bestdori format map"), content)
    } catch (error) {
        openDialog(i18n.t("An error occurred during export"), i18n.t("" + error))
        userMessage(i18n.t("Error export"), "error")
        throw error
    }
}

const reset = () => {
    openConfirm(
        i18n.t("Are you sure to reset current map?"),
        i18n.t("This action can not be reverted. Please make sure you have backed up your map."),
        () => {
            scope.reset()
            userMessage(i18n.t("Reset success"), "success")
        })
}

const exportEditorMap = () => {
    const content = EditMap.toJsonString(scope.map as any)
    downLoadFile(content)
}

const importEditorMap = async () => {
    try {
        const content = await openFile("*")
        scope.reset(EditMap.fromJson(content))
        userMessage(i18n.t("Import success"), "success")
    } catch (error) {
        if (!error) return
        userMessage(i18n.t("Error import"), "error")
        throw error
    }
}

let uploading = false;

const upload = async () => {
    let onProcess = false;
    try {
        if (uploading) throw new Error('There is already a chart being uploaded')
        onProcess = true;
        uploading = true;
        if (!Music.musicfile) throw new Error('No audio import')
        userMessage(i18n.t('Uploading audio'), 'info')
        const axios = require('axios');
        const fileObj = new FormData();
        fileObj.append('file', Music.musicfile as Blob);
        let uploadMusicResult = (await axios.post('https://editor.reikohaku.fun/test/upload/music', fileObj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
        if (!uploadMusicResult.result) throw new Error(uploadMusicResult.error);
        userMessage(i18n.t('Uploading chart'), 'info')
        let uploadChartResult =
            (await axios.post('https://editor.reikohaku.fun/test/upload/chart', (scope.map as any).state, {
                params: {
                    title: encodeURI(scope.meta.name),
                    audio: uploadMusicResult.id
                }
            })).data;
        if (!uploadChartResult.result) throw new Error(uploadChartResult.error);
        uploading = false;
        userMessage(i18n.t('Upload successfully', {id: uploadChartResult.id}), 'success')
        openDialog(i18n.t("Test in BanG Player"), i18n.t("Test Tips", {id: uploadChartResult.id}), `${uploadChartResult.id}`);
    } catch (error) {
        if (onProcess) uploading = false;
        if (!error) return
        userMessage(i18n.t(error.message), "error")
        throw error
    }
}

const Actions = () => {

    const {t} = useTranslation()


    return (
        <Grid style={{margin: "20px 0"}} item container direction="column" spacing={2}>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={importBBBv1}>
                    {t("Import bangbangboom format v1 (current map will loss)")}
                </Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={exportBestdori}>
                    {t("Export Bestdori format map")}
                </Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={exportEditorMap}>
                    {t("Download editor format map")}
                </Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={importEditorMap}>
                    {t("Import editor format map (current map will loss)")}
                </Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={reset}>
                    {t("Reset current map")}
                </Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant="outlined" onClick={upload}>
                    {t("Upload to test server")}
                </Button>
            </Grid>
        </Grid>)
}

export default Actions