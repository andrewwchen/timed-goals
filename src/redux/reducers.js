import * as actions from './actionTypes.js'
let lastId=0;

export default function reducer(state={goals:[]},action){
    switch (action.type) {
        case actions.GOAL_ADD:
            // insert command to add goals
            let newGoal = {
                title: action.payload.title, 
                time: action.payload.time,
                duration:action.payload.duration,
                complete:false,
                id:++lastId
            }
            return {
                ...state,
                goals: [
                    ...state.goals,
                    newGoal,
                ].sort((goal)=>(goal.time+goal.duration*1000))
            }
            break;
        case actions.GOAL_COMPLETE:
            console.log("goal finish  "+action.payload)
            let newGoals = state.goals;
            let index= newGoals.findIndex((goal)=>goal.id==action.payload.id)
            newGoals[index].complete = !newGoals[index].complete
            console.log(newGoals)
            return {
                ...state,
                goals: newGoals
            }
            break;
        default: return state;
    break;
    }
}