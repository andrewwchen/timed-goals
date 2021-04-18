import * as actions from './actionTypes.js'

export const timerStarted = () =>({
    type:actions.TIMER_START
})
export const goalAdded = (name, duration) =>({
    type:actions.GOAL_ADD,
    payload: {
        name:name,
        duration:duration,
        time:Date.now()
    }
})

export const goalFinished = (id) => ({
    type:actions.GOAL_COMPLETE,
    payload:{
        id: id
    }
})

export const goalDeleted = (id) =>({
    type:actions.GOAL_DELETE,
    payload:{
        id:id
    }
})

