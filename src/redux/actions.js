import * as actions from './actionTypes.js'

export const goalAdded = (title, duration) =>({
    type:actions.GOAL_ADD,
    payload: {
        title:title,
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

