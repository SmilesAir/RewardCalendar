/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import "./gallery.css"

const mainStore = require("./mainStore.js")
const {getTodayGoogleDate} = require("./utils.js")

const ryanClapGif = require("./assets/RyanClap.gif")

const Gallery = observer(class Gallery extends React.Component {
    constructor(props) {
        super(props)

        props.onDataReadyDelegate.push(() => this.onDataReady())
        props.onDataUpdatedDelegate.push(() => this.onDataUpdated())
    }

    onDataReady() {
        let todayGoogleDate = getTodayGoogleDate()
        let todayIndex = mainStore.data.findIndex((data) => data.googleDate === todayGoogleDate)
        let galleryCount = 0
        let attemptsStreakCount = 0
        for (let i = 0; i <= todayIndex; ++i) {
            let data = mainStore.data[i]
            let attempted = data.diffFeel !== null && data.diffFeel > 0
            if (attempted) {
                ++attemptsStreakCount
            }
            else if (todayIndex !== i) {
                if (attemptsStreakCount === 0 || attemptsStreakCount === 10) {
                    galleryCount = Math.max(0, galleryCount - 1)
                }
                attemptsStreakCount = 0
            }

            if (attemptsStreakCount >= 10) {
                attemptsStreakCount = 0
                ++galleryCount
            }
        }

        runInAction(() => {
            mainStore.galleryCount = galleryCount
            mainStore.heinMeterCount = galleryCount > 0 && attemptsStreakCount === 0 ? 10 : attemptsStreakCount
        })
    }

    onDataUpdated() {
        this.onDataReady()
    }

    render() {
        if (mainStore.galleryCount <= 0) {
            return null
        }

        return (
            <div className="galleryContainer">
                <img src={ryanClapGif}/>
            </div>
        )
    }
})

export default Gallery
