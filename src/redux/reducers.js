import * as actions from './actionTypes.js'
let lastId=0;

export default function reducer(state={currentTime:Date.now(),goals:{}},action){
    let id, newGoals
    switch (action.type) {
        case actions.GOAL_ADD:
            
            newGoals = {}
            newGoals[action.payload.id] = {
                name: action.payload.name, 
                time: action.payload.time,
                duration:action.payload.duration,
                complete:action.payload.complete,
            }
            console.log(newGoals)
            newGoals = Object.assign(newGoals,state.goals)
            console.log(newGoals)
            return {
                ...state,
                goals:newGoals
            }
            break;
        case actions.GOAL_COMPLETE:
            id = action.payload.id;
            newGoals = state.goals;
            newGoals[id].complete = !newGoals[id].complete
            return {
                ...state,
                goals: newGoals
            }
            break;
        case actions.GOAL_DELETE:
            id = action.payload.id; 
            newGoals = Object.assign({},state.goals)
            delete newGoals[id]
            return {
                ...state,
                goals: newGoals
            }
            break;
        case actions.LOAD_GOALS:
            let goals = {}
            action.payload.goals.forEach((goal)=>{goals[goal.id]={
                name:goal.name,
                duration:goal.duration,
                time:goal.time,
                complete:goal.complete
            }})
            return {
                ...state,
                goals:goals
            }
            break;
            
        default: return state;
    break;
    }
}