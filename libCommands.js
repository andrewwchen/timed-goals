// VSCode import
const vscode = require('vscode');

/*
* addTimedGoal: A function that takes the workplace context and a new timedGoal
* json object and adds it to the ExtensionContext.workspacestate data store.
* Returns void.
/**
 * @param {vscode.ExtensionContext} context
 */
function addTimedGoal(context, newTimedGoal){
    // Get current goals state
    updatedGoals = context.globalState.get('data').goals;
    
    // Add new goal to copy of present state
    updatedGoals.push(newTimedGoal);

    // Update global state with new data appended
    context.globalState.update('data', {goals: updatedGoals});
}


/*
* createTimedGoal: Creates a json object to be saved to the global data store
* from a list of passed parameters
* @param time Date
* @param name String
* @param duration int
* @param complete boolean
*/

function createTimedGoal(time, name, duration, complete){
    return{
            name: name,
            time: time,
            duration: duration,
            complete: complete
        }
}

module.exports = {
    createTimedGoal,
    addTimedGoal
}