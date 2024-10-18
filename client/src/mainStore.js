import { observable, runInAction } from "mobx"


export default observable({
    dataKey: undefined,
    data: undefined,
    cellData: undefined,
    selectedChallenge: undefined,
    galleryCount: 0,
    heinMeterCount: 0
})
