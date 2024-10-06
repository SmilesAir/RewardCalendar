/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { observable, runInAction } from "mobx"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import "./calendar.css"

const mainStore = require("./mainStore.js")


const Summary = observer(class Summary extends React.Component {
    constructor() {
        super()

        this.state = {
            events: [{ title: 'Scarecrow', start: new Date() }]
        }
    }

    renderEventContent(eventInfo) {
        return (
          <div>
            <div>{eventInfo.event.title}</div>
          </div>
        )
    }

    render() {
        return (
            <div className="contentBase">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={this.state.events}
                    eventContent={(eventInfo) => this.renderEventContent(eventInfo)}
                />
            </div>
        )
    }
})

export default Summary
