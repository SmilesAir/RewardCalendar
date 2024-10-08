import { observable, runInAction } from "mobx"


export default observable({
    dataKey: undefined,
    data: undefined,
    cellData: undefined,
    selectedChallenge: undefined
})
