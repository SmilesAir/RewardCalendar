/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./summary.css"

const mainStore = require("./mainStore.js")
const {getTodayGoogleDate, getChallengeData} = require("./utils.js")

const Summary = observer(class Summary extends React.Component {
    constructor() {
        super()
    }

    getSummaryData() {
        let ret = {
            attemptsStreak: 0,
            completionsStreak: 0,
            totalAttemps: 0,
            totalCompletions: 0
        }

        if (mainStore.data === undefined) {
            return ret
        }

        let todayGoogleDate = getTodayGoogleDate()
        let todayIndex = mainStore.data.findIndex((data) => data.googleDate === todayGoogleDate)
        let attempsStreakAlive = true
        let completionsStreakAlive = true
        for (let i = todayIndex; i >= 0; --i) {
            let data = mainStore.data[i]
            let attempted = data.diffFeel !== null && data.diffFeel > 0
            let completed = data.completed !== null && data.completed
            ret.totalAttemps += attempted ? 1 : 0
            ret.totalCompletions += completed ? 1 : 0
            if (attempsStreakAlive) {
                if (attempted || completed) {
                    ++ret.attemptsStreak
                }
                else if (todayIndex !== i) {
                    attempsStreakAlive = false
                }
            }
            if (completionsStreakAlive) {
                if (completed) {
                    ++ret.completionsStreak
                }
                else if (todayIndex !== i) {
                    completionsStreakAlive = false
                }
            }
        }

        return ret
    }

    getMeter() {
        let meter = []
        let summaryData = this.getSummaryData()
        const maxBarCount = 10
        let bars = summaryData.attemptsStreak % (maxBarCount + 1)
        for (let i = 0; i < maxBarCount; ++i) {
            let barStyle = {
            }
            if (i < bars) {
                barStyle.backgroundColor = "gold",
                barStyle["border-color"] = "lightsalmon"
                barStyle["font-weight"] = "bold"
                barStyle.color = "black"
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
        let summaryData = this.getSummaryData()

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
                            <td><div className="streakValues">{summaryData.attemptsStreak}</div></td>
                            <td><div className="streakValues">{summaryData.completionsStreak}</div></td>
                            <td><div className="streakValues">{summaryData.totalAttemps}/{summaryData.totalCompletions}</div></td>
                        </tr>
                    </tbody>
                </table>
                {this.getMeter()}
            </div>
        )
    }
})

export default Summary
