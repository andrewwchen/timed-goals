import * as actions from './actionTypes.js';

// called when goals loaded from vscode
export const goalsLoaded = (goals) =>({
    type:actions.LOAD_GOALS,
    payload: {
        goals:goals
    }
});

// called when goal added by user
export const goalAdded = (name, duration, time, id, complete) =>({
    type:actions.GOAL_ADD,
    payload: {
        name:name,
        duration:duration,
        time:time,
        id:id,
        complete:complete
    }
});

// called when goal completed by user
export const goalFinished = (id) => ({
    type:actions.GOAL_COMPLETE,
    payload:{
        id: id
    }
});

// called when goal deleted by user
export const goalDeleted = (id) =>({
    type:actions.GOAL_DELETE,
    payload:{
        id:id
    }
});

