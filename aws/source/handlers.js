const { JWT } = require("google-auth-library")
const { GoogleSpreadsheet } = require("google-spreadsheet")

const Common = require("./common.js")

module.exports.getData = (e, c, cb) => { Common.handler(e, c, cb, async (event, context) => {

    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
    ]

    const jwt = new JWT({
        email: "rewardcalendaraccount@rewardcalendar.iam.gserviceaccount.com",
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu+2YuAPmz52E3\n7eYJ9raaOsr2Wr5JS6jMCevAdkORNf2+kveYjXBPPW/XTHpgyN5kiKwuGDYqSMSw\nNaOOxgKH1NIyL5V04Q296H9GWPFGv1sOVuE1Kk31BAcGQbxk6Mgb6nxX/Znj9QrM\nlH9prmkq/vwvf+I1gBg30X/ZpXq2F0KpQFsmNWOQrWmFhAf2I33+8qP97WyNZMWJ\nUx6Ah8lBM/hnKpUqHi7rEHuJytc190rV2af45nxMNtYRQHlug4jcVNxWfEzE8mBY\njd4MfpiZgmsO3H66anR5lQ4xUVbyMUjV4GS40WobgfVf4/cPJboGMJi9pzr9IAob\nvJHCofQRAgMBAAECggEADFe106lkc6TuxdntR8ckBrl+bwWkFfn1AF1zyGnfJrtC\n+IIX3mYdpa08+hgOKs0IaNl+Ias6CN4Ep7RE4vGDJK8lm34hQfMM+9gOQDlOXZHq\nW5bTwGMJSC7eSvnwjsKfuN5fonpENGDov9j6qsrvZqXBRp1z6JeuPaO0q7bBMt5P\nyTK+2QjqAyMaUWN8KWlmrsgw72yYBif7aMw6SpxQ1oP8xTCF84josAycOWyImtA9\n+Z3ygFNMLEuazzikGoWXSRlGOSxRYcyXCchtEvt4JEirrwC5UpjgFjsQeq4ZSYwv\n0NuV6Hi0UOwMdVtiAw74bURXv8PWLe+8N5fAsnYeVQKBgQDaWxmKS4UOXqJsck1a\namZW8uqaMQe6HRtbTd2gnBpzzRD4Vds9dfN5VjVYPwRCDTqkUI5gdlanPfQcWFPF\n/MkIfdyWBL1ypnTyW/AsulU7boCYEWIPywtEp97S5mHlKf+UxeVVdHaWOg8YXNdd\nqv225xDpfGUDj3ccZjm93qXbTQKBgQDNJgrKuCxyYINF0J5GKQmVS4eTiJ08xgor\nWTslUtv7g8pvPluWVVpkO6qnIc8mnmH68Fg3q6nm07Xdb+k8VJMt/0Vu9L/N40rI\nBmuAChIK9XBjhJQnAjCBrSBIg7w8NZFV3IorjF43rd8NKybiKVv/11MhUHuiDtfW\n3HUejmvx1QKBgQDIHGcaq71D/wyBsHsdmpcxpivEpZx8P0Kb+Y9cKtO/PrcHr79d\n4yQAFjaLKi1fzznn7n+c/bbKTGfUNkqIDvO6GYa34Z4xXUWd+w3wH9AOyGWHd57T\n9HPeNq5pv4MF/uhg0sArAbHQWWMOI7+n8xXTso14PW1hxvAVEcZnMI31nQKBgQDJ\nc6X9U8YxuxytniMOepXyiWzlL65YU5EA6GrwR+HFprFPdEiz47UT4JO/869cGQPW\nS9YVNPlutk9M1+yNVfABpz8jqiv/nkd9DPDblwgIwuROlY52j+vaK4wcKWDbLy88\nxYjZIsoSmycB43IXfM3e+i+j80i05yaE05AfJXRS0QKBgCFMrL7EuiiHb5v/7F5w\nxVoxnkIlc9EmRXcnYqhw9q6kQJF35xXlfycfEKezyj8vzRvRivfFrQqvW+9dhHwf\nXHEDFypFriagQqWzFPv5aPsylfUHYiURVkAZdCi8jJzMzyZ1EtFzlfYDQ0mVkrCv\nJeRMY9jrPltzqZOJkDK9848G\n-----END PRIVATE KEY-----\n",
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
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu+2YuAPmz52E3\n7eYJ9raaOsr2Wr5JS6jMCevAdkORNf2+kveYjXBPPW/XTHpgyN5kiKwuGDYqSMSw\nNaOOxgKH1NIyL5V04Q296H9GWPFGv1sOVuE1Kk31BAcGQbxk6Mgb6nxX/Znj9QrM\nlH9prmkq/vwvf+I1gBg30X/ZpXq2F0KpQFsmNWOQrWmFhAf2I33+8qP97WyNZMWJ\nUx6Ah8lBM/hnKpUqHi7rEHuJytc190rV2af45nxMNtYRQHlug4jcVNxWfEzE8mBY\njd4MfpiZgmsO3H66anR5lQ4xUVbyMUjV4GS40WobgfVf4/cPJboGMJi9pzr9IAob\nvJHCofQRAgMBAAECggEADFe106lkc6TuxdntR8ckBrl+bwWkFfn1AF1zyGnfJrtC\n+IIX3mYdpa08+hgOKs0IaNl+Ias6CN4Ep7RE4vGDJK8lm34hQfMM+9gOQDlOXZHq\nW5bTwGMJSC7eSvnwjsKfuN5fonpENGDov9j6qsrvZqXBRp1z6JeuPaO0q7bBMt5P\nyTK+2QjqAyMaUWN8KWlmrsgw72yYBif7aMw6SpxQ1oP8xTCF84josAycOWyImtA9\n+Z3ygFNMLEuazzikGoWXSRlGOSxRYcyXCchtEvt4JEirrwC5UpjgFjsQeq4ZSYwv\n0NuV6Hi0UOwMdVtiAw74bURXv8PWLe+8N5fAsnYeVQKBgQDaWxmKS4UOXqJsck1a\namZW8uqaMQe6HRtbTd2gnBpzzRD4Vds9dfN5VjVYPwRCDTqkUI5gdlanPfQcWFPF\n/MkIfdyWBL1ypnTyW/AsulU7boCYEWIPywtEp97S5mHlKf+UxeVVdHaWOg8YXNdd\nqv225xDpfGUDj3ccZjm93qXbTQKBgQDNJgrKuCxyYINF0J5GKQmVS4eTiJ08xgor\nWTslUtv7g8pvPluWVVpkO6qnIc8mnmH68Fg3q6nm07Xdb+k8VJMt/0Vu9L/N40rI\nBmuAChIK9XBjhJQnAjCBrSBIg7w8NZFV3IorjF43rd8NKybiKVv/11MhUHuiDtfW\n3HUejmvx1QKBgQDIHGcaq71D/wyBsHsdmpcxpivEpZx8P0Kb+Y9cKtO/PrcHr79d\n4yQAFjaLKi1fzznn7n+c/bbKTGfUNkqIDvO6GYa34Z4xXUWd+w3wH9AOyGWHd57T\n9HPeNq5pv4MF/uhg0sArAbHQWWMOI7+n8xXTso14PW1hxvAVEcZnMI31nQKBgQDJ\nc6X9U8YxuxytniMOepXyiWzlL65YU5EA6GrwR+HFprFPdEiz47UT4JO/869cGQPW\nS9YVNPlutk9M1+yNVfABpz8jqiv/nkd9DPDblwgIwuROlY52j+vaK4wcKWDbLy88\nxYjZIsoSmycB43IXfM3e+i+j80i05yaE05AfJXRS0QKBgCFMrL7EuiiHb5v/7F5w\nxVoxnkIlc9EmRXcnYqhw9q6kQJF35xXlfycfEKezyj8vzRvRivfFrQqvW+9dhHwf\nXHEDFypFriagQqWzFPv5aPsylfUHYiURVkAZdCi8jJzMzyZ1EtFzlfYDQ0mVkrCv\nJeRMY9jrPltzqZOJkDK9848G\n-----END PRIVATE KEY-----\n",
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
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCu+2YuAPmz52E3\n7eYJ9raaOsr2Wr5JS6jMCevAdkORNf2+kveYjXBPPW/XTHpgyN5kiKwuGDYqSMSw\nNaOOxgKH1NIyL5V04Q296H9GWPFGv1sOVuE1Kk31BAcGQbxk6Mgb6nxX/Znj9QrM\nlH9prmkq/vwvf+I1gBg30X/ZpXq2F0KpQFsmNWOQrWmFhAf2I33+8qP97WyNZMWJ\nUx6Ah8lBM/hnKpUqHi7rEHuJytc190rV2af45nxMNtYRQHlug4jcVNxWfEzE8mBY\njd4MfpiZgmsO3H66anR5lQ4xUVbyMUjV4GS40WobgfVf4/cPJboGMJi9pzr9IAob\nvJHCofQRAgMBAAECggEADFe106lkc6TuxdntR8ckBrl+bwWkFfn1AF1zyGnfJrtC\n+IIX3mYdpa08+hgOKs0IaNl+Ias6CN4Ep7RE4vGDJK8lm34hQfMM+9gOQDlOXZHq\nW5bTwGMJSC7eSvnwjsKfuN5fonpENGDov9j6qsrvZqXBRp1z6JeuPaO0q7bBMt5P\nyTK+2QjqAyMaUWN8KWlmrsgw72yYBif7aMw6SpxQ1oP8xTCF84josAycOWyImtA9\n+Z3ygFNMLEuazzikGoWXSRlGOSxRYcyXCchtEvt4JEirrwC5UpjgFjsQeq4ZSYwv\n0NuV6Hi0UOwMdVtiAw74bURXv8PWLe+8N5fAsnYeVQKBgQDaWxmKS4UOXqJsck1a\namZW8uqaMQe6HRtbTd2gnBpzzRD4Vds9dfN5VjVYPwRCDTqkUI5gdlanPfQcWFPF\n/MkIfdyWBL1ypnTyW/AsulU7boCYEWIPywtEp97S5mHlKf+UxeVVdHaWOg8YXNdd\nqv225xDpfGUDj3ccZjm93qXbTQKBgQDNJgrKuCxyYINF0J5GKQmVS4eTiJ08xgor\nWTslUtv7g8pvPluWVVpkO6qnIc8mnmH68Fg3q6nm07Xdb+k8VJMt/0Vu9L/N40rI\nBmuAChIK9XBjhJQnAjCBrSBIg7w8NZFV3IorjF43rd8NKybiKVv/11MhUHuiDtfW\n3HUejmvx1QKBgQDIHGcaq71D/wyBsHsdmpcxpivEpZx8P0Kb+Y9cKtO/PrcHr79d\n4yQAFjaLKi1fzznn7n+c/bbKTGfUNkqIDvO6GYa34Z4xXUWd+w3wH9AOyGWHd57T\n9HPeNq5pv4MF/uhg0sArAbHQWWMOI7+n8xXTso14PW1hxvAVEcZnMI31nQKBgQDJ\nc6X9U8YxuxytniMOepXyiWzlL65YU5EA6GrwR+HFprFPdEiz47UT4JO/869cGQPW\nS9YVNPlutk9M1+yNVfABpz8jqiv/nkd9DPDblwgIwuROlY52j+vaK4wcKWDbLy88\nxYjZIsoSmycB43IXfM3e+i+j80i05yaE05AfJXRS0QKBgCFMrL7EuiiHb5v/7F5w\nxVoxnkIlc9EmRXcnYqhw9q6kQJF35xXlfycfEKezyj8vzRvRivfFrQqvW+9dhHwf\nXHEDFypFriagQqWzFPv5aPsylfUHYiURVkAZdCi8jJzMzyZ1EtFzlfYDQ0mVkrCv\nJeRMY9jrPltzqZOJkDK9848G\n-----END PRIVATE KEY-----\n",
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

