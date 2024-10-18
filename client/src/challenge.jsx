/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./challenge.css"

const mainStore = require("./mainStore.js")
const {getTodayGoogleDate, pad, postData, getChallengeData} = require("./utils.js")

const majkaThumbsUp2 = require("./assets/MajkaThumbsUp2.png")

const Challenge = observer(class Challenge extends React.Component {
    constructor(props) {
        super(props)

        props.onDataReadyDelegate.push(() => this.onDataReady())
        this.onDataUpdatedDelegate = props.onDataUpdatedDelegate

        this.state = {
            particles: []
        }

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
        let videoElement = <div className="noVideoMessage">No Video Example Available</div>
        let videoId = getChallengeData().video
        if (videoId) {
            videoElement = <iframe src={`https://drive.google.com/file/d/${videoId}/preview`} width="700" height="390" allow="autoplay"></iframe>
        }
        return (
            <div className="video">
                {videoElement}
            </div>
        )
    }

    onCompletedChanged(e) {
        runInAction(() => {
            let challengeData = getChallengeData()
            challengeData.completed = !challengeData.completed

            if (challengeData.completed) {
                this.addParticle({x: 300, y: 300})
            }

            for (let func of this.onDataUpdatedDelegate) {
                func()
            }

            postData(`setCompleted/${challengeData.googleSheetRowIndex}/completed/${challengeData.completed ? 1 : 0}`, undefined).catch((error) => {
                console.error(error)
            })
        })
    }

    onStarClick(e, stars) {
        runInAction(() => {
            let challengeData = getChallengeData()
            if (stars === challengeData.diffFeel) {
                challengeData.diffFeel = 0
            } else {
                challengeData.diffFeel = stars
                this.addParticle({x: e.clientX, y: e.clientY})
            }

            for (let func of this.onDataUpdatedDelegate) {
                func()
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
                <div key={i} className={`star ${selected ? "starSelected" : ""}`} onClick={(e) => this.onStarClick(e, i + 1)}>{i + 1}</div>
            )
        }
        return (
            <div className="feedback">
                <div className="feelContainer">
                    <div className="feelLabel">Diff Feel</div>
                    <div className="starContainer">
                        {stars}
                    </div>
                </div>
                <div className="completionContainer">
                    <div className="completed">Completed?</div>
                    <input type="checkbox" checked={challengeData.completed} onChange={(e) => this.onCompletedChanged(e)}/>
                </div>
            </div>
        )
    }

    addParticle(pos) {
        this.state.particles.push({
            position: pos,
            velocity: {
                x: Math.random() * 400 - 200,
                y: -Math.random() * 800
            },
            lifetime: 0,
            maxLifetime: 2,
            scale: 0
        })
        this.setState(this.state)

        const deltaSeconds = 16 / 1000
        if (this.particleUpdateHandle === undefined) {
            this.particleUpdateHandle = setInterval(() => {
                for (let part of this.state.particles) {
                    part.position.x += part.velocity.x * deltaSeconds
                    part.position.y += part.velocity.y * deltaSeconds
                    part.scale = Math.min(1.5, part.scale + 1.5 * deltaSeconds)
                    part.lifetime += deltaSeconds
                }

                let newParticles = this.state.particles.filter((part) => part.lifetime < part.maxLifetime)

                if (newParticles.length === 0) {
                    clearInterval(this.particleUpdateHandle)
                    this.particleUpdateHandle = undefined
                }

                this.setState({particles: newParticles})
            }, 16)
        }
    }

    getParticles() {
        let particleElements = this.state.particles.map((part) => {
            let style = {
                top: part.position.y + "px",
                left: part.position.x + "px",
                transform: `scale(${part.scale})`
            }
            return (
                <img key={part.position.x} className="particle" style={style} src={majkaThumbsUp2} />
            )
        })
        return (
            <div>
                {particleElements}
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
                {this.getParticles()}
            </div>
        )
    }
})

export default Challenge
