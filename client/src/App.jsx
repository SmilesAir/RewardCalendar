/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./App.css"

const mainStore = require("./mainStore.js")
const Summary = require("./summary.jsx")
const Challenge = require("./challenge.jsx")
const Calendar = require("./calendar.jsx")
const {googleDateToDate, getTodayGoogleDate, getData} = require("./utils.js")

if (import.meta.hot) {
    import.meta.hot.on(
      "vite:beforeUpdate",
      () => console.clear()
    );
}

const App = observer(class App extends React.Component {
    constructor() {
        super()

        this.onDataReady = []

        getData(`getData`).then((resp) => {
            runInAction(() => {
                //console.log(resp)

                this.fillDataFromGoogleSheet(resp.cellData)
            })
        })

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

    fillDataFromGoogleSheet(cellData) {
        mainStore.name = cellData[0][1]
        mainStore.cellData = cellData
        mainStore.data = []

        for (let i = 3; i < cellData.length; ++i) {
            let googleDate = cellData[i][0]
            if (googleDate > getTodayGoogleDate()) {
                break
            }

            mainStore.data.push({
                start: googleDateToDate(googleDate),
                googleDate: googleDate,
                title: cellData[i][1],
                targetDiff: cellData[i][2],
                video: cellData[i][3],
                diffFeel: cellData[i][4],
                completed: cellData[i][5],
                googleSheetRowIndex: i + 1
            })
        }

        console.log(JSON.parse(JSON.stringify(mainStore.data)))

        for (let func of this.onDataReady) {
            func()
        }
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
                    <Summary onDataReadyDelegate={this.onDataReady}/>
                    <Challenge onDataReadyDelegate={this.onDataReady}/>
                    <Calendar onDataReadyDelegate={this.onDataReady}/>
                </div>
            </div>
        )
    }
})

export default App
