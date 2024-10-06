/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import { JWT } from "google-auth-library"
import { GoogleSpreadsheet } from "google-spreadsheet"
import creds from "./rewardcalendar-7a8682094cf6.json"
import "./App.css"

const mainStore = require("./mainStore.js")
const Summary = require("./summary.jsx")
const Challenge = require("./challenge.jsx")
const Calendar = require("./calendar.jsx")

// if (import.meta.hot) {
//     import.meta.hot.on(
//       "vite:beforeUpdate",
//       () => console.clear()
//     );
// }

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
]

console.log("hey2")

const App = observer(class App extends React.Component {
    constructor() {
        super()

        console.log("hey")

        setTimeout(async () => {
            const jwt = new JWT({
                email: creds.client_email,
                key: creds.private_key,
                scopes: SCOPES,
            });
            console.log(jwt)
            const doc = new GoogleSpreadsheet("1M4c7w9iB15oHFFnzW6y8kURmcc-zO2sXbi4dbr3TB_E", jwt)

            await doc.loadInfo()
            console.log(doc.title)
        }, 1)

        // Can only be used for read
        // let id = "1M4c7w9iB15oHFFnzW6y8kURmcc-zO2sXbi4dbr3TB_E"
        // let gid = "0";
        // let url = "https://docs.google.com/spreadsheets/d/" + id + "/gviz/tq?tqx=out:json&tq&gid=" + gid
        // fetch(url)
        //     .then(response => response.text())
        //     .then(data => {
        //         this.parseGoogleSheetJson(data.substring(47).slice(0, -2))

        //         console.log(JSON.parse(JSON.stringify(mainStore)))
        //     })
    }

    // Only used for read only
    parseGoogleSheetJson(jsonString){
        var json = JSON.parse(jsonString);

        mainStore.data = []

        json.table.rows.forEach(row => {
            let newRow = []
            row.c.forEach(cell => {
                let value = ""
                try {
                    value = cell.f ? cell.f : cell.v
                }
                catch(e) {
                    // nothing
                }

                newRow.push(value)
            })

            mainStore.data.push(newRow)
        })

        if (mainStore.data.length > 1) {
            mainStore.name = mainStore.data[0][1]
            mainStore.dataKey = mainStore.data[1][1]
            mainStore.startDate = new Date(mainStore.data[0][0])
        }
    }

    render() {
        return (
            <div className="topContainer">
                <h2>{mainStore.name}</h2>
                <div className="contentContainer">
                    <Summary/>
                    <Challenge/>
                    <Calendar/>
                </div>
            </div>
        )
    }
})

export default App
