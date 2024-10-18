const moment = require("moment-timezone")

const mainStore = require("./mainStore.js")

const utils = {}

//const epoch = "1900-1-1"
const epoch = "1899-12-30"

utils.googleDateToDate = function(googleDate) {
    return moment(epoch).add(googleDate, "days").format()
}

utils.dateToGoogleDate = function(date) {
    return moment().diff(date, "days")
}

utils.getTodayGoogleDate = function() {
    return moment().diff(moment(epoch), "days")
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