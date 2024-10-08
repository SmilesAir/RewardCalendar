/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import "./calendar.css"

const mainStore = require("./mainStore.js")

const Calendar = observer(class Calendar extends React.Component {
    constructor(props) {
        super(props)

        props.onDataReadyDelegate.push(() => this.onDataReady())

        this.state = {
            events: [{ title: 'Scarecrow', start: new Date() }]
        }
    }

    onDataReady() {
        this.setState()
    }

    onClickEvent(event) {
        runInAction(() => {
            mainStore.selectedChallenge = event.extendedProps.googleDate
        })

        console.log(mainStore.selectedChallenge)
    }

    renderEventContent(eventInfo) {
        return (
          <div className="event" onClick={() => this.onClickEvent(eventInfo.event)}>
            <div>{eventInfo.event.title}</div>
          </div>
        )
    }

    render() {
        return (
            <div className="contentBase calendar">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={mainStore.data}
                    eventContent={(eventInfo) => this.renderEventContent(eventInfo)}
                />
            </div>
        )
    }
})

export default Calendar
