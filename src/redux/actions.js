import * as actions from './actionTypes.js'

export const goalsLoaded = () =>({
    type:actions.LOAD_GOALS
})
export const goalAdded = (name, duration, time, id, complete) =>({
    type:actions.GOAL_ADD,
    payload: {
        name:name,
        duration:duration,
        time:time,
        id:id,
        complete:complete
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

