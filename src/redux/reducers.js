import * as actions from './actionTypes.js'
let lastId=0;

export default function reducer(state={currentTime:Date.now(),goals:{}},action){
    let id, newGoals
    switch (action.type) {
        case actions.GOAL_ADD:
            // insert command to add goals
            newGoals = {}
            newGoals[++lastId] = {
                name: action.payload.name, 
                time: action.payload.time,
                duration:action.payload.duration,
                complete:false,
            }
            newGoals = Object.assign(newGoals,state.goals)
            vscode.postMessage({
                command: 'alert',
            })
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
        case actions.TIMER_START:
            setInterval(()=>{
                
            })
        default: return state;
    break;
    }
}