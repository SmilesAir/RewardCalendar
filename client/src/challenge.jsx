/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./challenge.css"

const mainStore = require("./mainStore.js")


const Summary = observer(class Summary extends React.Component {
    constructor() {
        super()
    }

    getTimer() {
        return (
            <div>12:45:32</div>
        )
    }

    getMove() {
        return (
            <div className="move">Scarecrow</div>
        )
    }

    getVideo() {
        return (
            <div className="video">
                <div className="noVideoMessage">No Video Example Available</div>
            </div>
        )
    }

    getFeedback() {
        let stars = []
        for (let i = 0; i < 5; ++i) {
            stars.push(
                <div key={i} className="star">{i + 1}</div>
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
                    <input type="checkbox"/>
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

export default Summary
