import moment from "moment"

const mainStore = require("./mainStore.js")

const utils = {}

utils.googleDateToDate = function(googleDate) {
    let newDate = new Date("1899-12-31")
    newDate.setDate(newDate.getDate() + googleDate)
    return newDate
}

utils.dateToGoogleDate = function(date) {
    return moment().diff(date, "days")
}

utils.getTodayGoogleDate = function() {
    return moment().diff(new Date("1899-12-31"), "days")
}

utils.pad = function(num) {
    return ("0" + parseInt(num)).substr(-2)
}

const awsPath = "https://5kuebmbbmg.execute-api.us-west-2.amazonaws.com/production/"

utils.postData = function(url, data) {
    return fetch(awsPath + url, {
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

utils.getData = function(url) {
    return fetch(awsPath + url, {
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

utils.getChallengeData = function() {
    if (mainStore.selectedChallenge !== undefined) {
        let challengeData = mainStore.data.find((data) => data.googleDate === mainStore.selectedChallenge)
        if (challengeData !== undefined) {
            return challengeData
        }
    }

    return {
        title: "N/A",
        completed: false
    }
}

export default utils