/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./App.css"

const mainStore = require("./mainStore.js")
const Summary = require("./summary.jsx")
const Challenge = require("./challenge.jsx")
const Calendar = require("./calendar.jsx")

if (import.meta.hot) {
    import.meta.hot.on(
      "vite:beforeUpdate",
      () => console.clear()
    );
}

const awsPath = "https://5kuebmbbmg.execute-api.us-west-2.amazonaws.com/production/"

function postData(url, data) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        console.error(error)
    })
}

function getData(url) {
    return fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        console.error(error)
    })
}

const App = observer(class App extends React.Component {
    constructor() {
        super()

        getData(`${awsPath}getData`).then((resp) => {
            runInAction(() => {
                console.log(resp)
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

    onTest() {
        postData(`${awsPath}setDiffFeel/${10}/feel/${3}`, undefined).catch((error) => {
            console.error(error)
        })

        postData(`${awsPath}setCompleted/${10}/completed/${1}`, undefined).catch((error) => {
            console.error(error)
        })
    }

    render() {
        return (
            <div className="topContainer">
                <h2>{mainStore.name}</h2>
                <div className="contentContainer">
                    <button onClick={() => this.onTest()}>test</button>
                    <Summary/>
                    <Challenge/>
                    <Calendar/>
                </div>
            </div>
        )
    }
})

export default App
