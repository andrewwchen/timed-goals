// VSCode import
const vscode = require('vscode');

/*
msToStr: A helper function that converts time in milliseconds to formatted
         hours, minutes, seconds

int ms

referenced: https://stackoverflow.com/questions/13601737/how-to-convert-milliseconds-into-a-readable-date-minutesseconds-format
*/
function msToStr(ms) {
  const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
  const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
  
  var string;
  if (hours > 0) { // only hours and minutes displayed
    string = `${hours} hours ${minutes} minutes`;
  }
  else if (minutes > 0) { // only minutes displayed
    string = `${minutes} minutes`;
  }
  else { // only seconds displayed
    string = `${Math.max(0, seconds)} seconds`;
  }
  return string;
}

/*
remainingTime: A helper function that calculates a goal's time remaining
               in seconds

Object goal
*/
function remainingTime(goal) {
  let now = Date.now();
  let timeElapsed = now - goal.time;
  let timeRemaining = goal.duration * 1000 - timeElapsed;
  return timeRemaining;
}

/*
createProgressBar: A function that displays a live timer for a goal

Object goal
*/
function createProgressBar(goal) {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: goal.name,
    cancellable: true
  }, (progress, token) => {

    const durationNow = remainingTime(goal);

    token.onCancellationRequested(() => {
      console.log(`${goal.name}'s progress bar was cancelled.`);
    });

    progress.report({ increment: 0 });
    
    for (let i=1; i<=1000; i++) {
      setTimeout(() => {
        progress.report({ increment: 0.1, message: `${msToStr(remainingTime(goal))}` });
      }, durationNow * i * .001);
    }

    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve();
        vscode.window.showInformationMessage(`${goal.name}: time's up`)
      }, durationNow);
    });

    return p;
  });

}

/*
* addTimedGoal: A function that takes the workplace context and a new timedGoal
* json object and adds it to the ExtensionContext.workspacestate data store.
* Returns void.
/**
 * @param {vscode.ExtensionContext} context
 */
function addTimedGoal(context, newTimedGoal){
    // Get current goals state
    let updatedGoals = context.globalState.get('data').goals;
    
    // Add new goal to copy of present state
    updatedGoals.push(newTimedGoal);

    // Update global state with new data appended
    context.globalState.update('data', {goals: updatedGoals});
}


/*
* createTimedGoal: Creates a json object to be saved to the global data store
* from a list of passed parameters
* @param time Date (starttime in ms unix)
* @param name String
* @param duration int (seconds)
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

function getIndexPanelHtml(){
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
	</head>
	<body>
			<h1>Timed Goals</h1>
			<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
	</body>
	</html>`;
}

let currentPanel = undefined;
function viewUI(context) {
  const columnToShowIn = vscode.window.activeTextEditor
    ? vscode.window.activeTextEditor.viewColumn
    : undefined;
  if (currentPanel) {
    // If we already have a panel, show it in the target column
    currentPanel.reveal(columnToShowIn);
  } else {
    // Otherwise, create a new panel
    currentPanel = vscode.window.createWebviewPanel(
      'timedGoals', // Identifies the type of the webview. Used internally
      'Timed Goals', // Title of the panel displayed to the user
      vscode.ViewColumn.One, // Editor column to show the new webview panel in.
      {} // Webview options. More on these later.
    );
  }
  // Reset when the current panel is closed
  currentPanel.onDidDispose(
    () => {
      currentPanel = undefined;
    },
    null,
    context.subscriptions
  );
  currentPanel.webview.html = getIndexPanelHtml();
}

module.exports = {
  createTimedGoal,
  addTimedGoal,
  createProgressBar,
  viewUI
}
