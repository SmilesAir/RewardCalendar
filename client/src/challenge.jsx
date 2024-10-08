/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./challenge.css"

const mainStore = require("./mainStore.js")
const {getTodayGoogleDate, pad, postData, getChallengeData} = require("./utils.js")

const Challenge = observer(class Challenge extends React.Component {
    constructor(props) {
        super(props)

        props.onDataReadyDelegate.push(() => this.onDataReady())

        setInterval(() => {
            this.setState({})
        }, 1000)
    }

    onDataReady() {
        mainStore.selectedChallenge = getTodayGoogleDate()
    }

    getTimer() {
        let start = new Date()
        start.setHours(23, 59, 59)
        let now = new Date()
        if (now > start) {
            start.setDate(start.getDate() + 1)
        }
        let remain = (start - now) / 1000
        let hours = pad((remain / 60 / 60) % 60)
        let minutes = pad((remain / 60) % 60)
        let seconds = pad(remain % 60)

        return (
            <div>{`Time Remaining: ${hours}:${minutes}:${seconds}`}</div>
        )
    }

    getMove() {
        let challengeData = getChallengeData()
        let move = challengeData !== undefined ? challengeData.title : "No Challenge Selected"
        return (
            <div className="move">{move}</div>
        )
    }

    getVideo() {
        return (
            <div className="video">
                <div className="noVideoMessage">No Video Example Available</div>
            </div>
        )
    }

    onCompletedChanged() {
        runInAction(() => {
            let challengeData = getChallengeData()
            challengeData.completed = !challengeData.completed

            postData(`setCompleted/${challengeData.googleSheetRowIndex}/completed/${challengeData.completed ? 1 : 0}`, undefined).catch((error) => {
                console.error(error)
            })
        })
    }

    onStarClick(stars) {
        runInAction(() => {
            let challengeData = getChallengeData()
            if (stars === challengeData.diffFeel) {
                challengeData.diffFeel = 0
            } else {
                challengeData.diffFeel = stars
            }

            postData(`setDiffFeel/${challengeData.googleSheetRowIndex}/feel/${challengeData.diffFeel}`, undefined).catch((error) => {
                console.error(error)
            })
        })
    }

    getFeedback() {
        let challengeData = getChallengeData()
        let stars = []
        for (let i = 0; i < 5; ++i) {
            let selected = i < challengeData.diffFeel
            stars.push(
                <div key={i} className={`star ${selected ? "starSelected" : ""}`} onClick={() => this.onStarClick(i + 1)}>{i + 1}</div>
            )
        }
        return (
            <div className="feedback">
                <div className="feelContainer">
                    <div>Diff Feel</div>
                    <div className="starContainer">
                        {stars}
                    </div>
                </div>
                <div className="completionContainer">
                    <div className="completed">Completed?</div>
                    <input type="checkbox" checked={challengeData.completed} onChange={() => this.onCompletedChanged()}/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="contentBase challengeContainer">
                <div className="title">
                    <div>Daily Challenge</div>
                    {this.getTimer()}
                </div>
                {this.getMove()}
                {this.getVideo()}
                {this.getFeedback()}
            </div>
        )
    }
})

export default Challenge
