const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager")
const { JWT } = require("google-auth-library")
const { GoogleSpreadsheet } = require("google-spreadsheet")

const Common = require("./common.js")

async function getSecretKey() {
    const secret_name = "reward-calendar/google-sheet";

    const client = new SecretsManagerClient({
        region: "us-west-2",
    })

    let response
    try {
        response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT"
        })
        )
    } catch (error) {
        throw error
    }

    const secret = JSON.parse(response.SecretString)
    return secret.AsiaSzukalskaGoogleSheetPrivateKey.replace(/\\n/g,"\n")
}

module.exports.getData = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {
    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]
    const jwt = new JWT({
        email: "rewardcalendaraccount@rewardcalendar.iam.gserviceaccount.com",
        key: await getSecretKey(),
        scopes: SCOPES,
    })
    const doc = new GoogleSpreadsheet("1M4c7w9iB15oHFFnzW6y8kURmcc-zO2sXbi4dbr3TB_E", jwt)

    await doc.loadInfo()

    let cellData = []
    const sheet = doc.sheetsByIndex[0]
    await sheet.loadCells(`A1:F${sheet.rowCount}`)
    for (let rowIndex = 0; rowIndex < sheet.rowCount; ++rowIndex) {
        let rowData = []
        for (let columnIndex = 0; columnIndex < 6; ++columnIndex) {
            rowData.push(sheet.getCell(rowIndex, columnIndex).value)
        }

        cellData.push(rowData)
    }

    return {
        success: true,
        title: doc.title,
        cellData: cellData
    }
})}

module.exports.setDiffFeel = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {
    let rowIndex = decodeURIComponent(event.pathParameters.rowIndex)
    let feel = decodeURIComponent(event.pathParameters.feel)

    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]

    const jwt = new JWT({
        email: "rewardcalendaraccount@rewardcalendar.iam.gserviceaccount.com",
        key: await getSecretKey(),
        scopes: SCOPES,
    })
    const doc = new GoogleSpreadsheet("1M4c7w9iB15oHFFnzW6y8kURmcc-zO2sXbi4dbr3TB_E", jwt)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    const cellName = `E${rowIndex}`
    await sheet.loadCells(`${cellName}:${cellName}`)
    let cell = sheet.getCellByA1(cellName)
    cell.value = parseInt(feel)
    await sheet.saveUpdatedCells()

    return {
        success: true
    }
})}

module.exports.setCompleted = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {
    let rowIndex = decodeURIComponent(event.pathParameters.rowIndex)
    let completed = decodeURIComponent(event.pathParameters.completed) == "1"

    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]

    const jwt = new JWT({
        email: "rewardcalendaraccount@rewardcalendar.iam.gserviceaccount.com",
        key: await getSecretKey(),
        scopes: SCOPES,
    })
    const doc = new GoogleSpreadsheet("1M4c7w9iB15oHFFnzW6y8kURmcc-zO2sXbi4dbr3TB_E", jwt)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    const cellName = `F${rowIndex}`
    await sheet.loadCells(`${cellName}:${cellName}`)
    let cell = sheet.getCellByA1(cellName)
    cell.value = completed
    await sheet.saveUpdatedCells()

    return {
        success: true
    }
})}

