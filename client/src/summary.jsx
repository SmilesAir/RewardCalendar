/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./summary.css"

const mainStore = require("./mainStore.js")


const Summary = observer(class Summary extends React.Component {
    constructor() {
        super()
    }

    getMeter() {
        let meter = []
        for (let i = 0; i < 10; ++i) {
            let barStyle = {
                "backgroundColor": "gold"
            }
            meter.push(
                <td key={i}>
                    <div style={barStyle} className="meterBar">{i + 1}</div>
                </td>
            )
        }
        return (
            <div className="meter">
                <div>
                    Hein Meter
                </div>
                <table className="barsContainer">
                    <tbody>
                        <tr>
                            {meter}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div className="contentBase">
                <table>
                    <thead>
                        <tr>
                            <th>Attempts Streak</th>
                            <th>Completions Streak</th>
                            <th>Total Attemps/Completions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0/0</td>
                        </tr>
                    </tbody>
                </table>
                {this.getMeter()}
            </div>
        )
    }
})

export default Summary
