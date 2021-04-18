// VSCode import
const fs = require('fs');
const vscode = require('vscode');
const defaultData = require('./defaultData.json');

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
showTimer: A function that displays a live timer for the most pressing goal
vscode context context
*/
function showTimer(context) {
  let mostPressing = undefined;
  let oldGoals = getTimedGoals(context);
  for (let i=0; i < oldGoals.length; i++) {
    if (!oldGoals[i].complete) {
      console.log("1 + " + oldGoals[i].name);
      // start time in future
      if (remainingTime(oldGoals[i]) > 0) {
        console.log("2 + " + oldGoals[i].name);
        if (!mostPressing || remainingTime(mostPressing) > remainingTime(oldGoals[i])) {
          console.log("3 + " + oldGoals[i].name);
          mostPressing = oldGoals[i];
        }
      }
      
    }
  }
  if (mostPressing) {
    console.log(mostPressing.name)
    createProgressBar(mostPressing);
  } else {
    console.log("none were most pressing")
  }
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
* @param id int
* @param time Date (starttime in ms unix)
* @param name String
* @param duration int (seconds)
* @param complete boolean
*/
function createTimedGoal(time, name, duration, complete, id) {
  return {
    id: id,
    name: name,
    time: time,
    duration: duration,
    complete: complete
  }
}

/*
* deleteTimedGoal: Deletes a json object from the global data store
* @param id int
/**
 * @param {vscode.ExtensionContext} context
 */
function deleteTimedGoal(id, context){
  let oldGoals = context.globalState.get('data').goals;
  for (let i=0; i < oldGoals.length; i++) {
    if (oldGoals[i].id == id) {
      oldGoals.splice(i,1);
      context.globalState.update('data', {goals: oldGoals});
      break;
    }
  }
}

/*
* completeTimedGoal: Completes a json object from the global data store
* @param id int
/**
 * @param {vscode.ExtensionContext} context
 */
function completeTimedGoal(id, context) {
  let oldGoals = context.globalState.get('data').goals;
  for (let i=0; i < oldGoals.length; i++) {
    if (oldGoals[i].id == id) {
      oldGoals[i].complete = true;
      context.globalState.update('data', {goals: oldGoals});
      break;
    }
  }
}


/*
* getTimedGoals: Gets json objects from the global data store
/**
 * @param {vscode.ExtensionContext} context
 */
const useDefaultData = false;
async function getTimedGoals(context) {
  let oldGoals = context.globalState.get('data').goals;
  if (useDefaultData || !oldGoals || oldGoals.length < 1) {
    if (useDefaultData) {
      await context.globalState.update('data', defaultData);
    } else {
      await context.globalState.update('data', {goals: [] } )
    }
    oldGoals = context.globalState.get('data').goals;
    if (useDefaultData) {
      for (let i=0; i < oldGoals.length; i++) {
        oldGoals[i].time = Date.now();
      }
    }
  }
  return oldGoals;
}

/*
* getNewId: Gets highest id among data objectes
/**
 * @param {vscode.ExtensionContext} context
 */
function getNewId(context){
  let oldGoals = context.globalState.get('data').goals;
  let highestId = 0;
  for (let i=0; i < oldGoals.length; i++) {
    if (oldGoals[i].id > highestId) {
      highestId = oldGoals[i].id;
    }
  }
  return highestId + 1;
}


function getIndexPanelHtml(){
  let scripts = fs.readFileSync('C:/Users/andre/Documents/GitHub/timed-goals/dist/compiled.js','utf8') 
  let styles = fs.readFileSync('C:/Users/andre/Documents/GitHub/timed-goals/index.css','utf8')
  return `
  <html>
  <head>
        <meta charset="utf-8">
        <title>Timed Goals</title>
    </head>
    <body>
        <div id="react-content"><h1>HELLO </h1> </div>
    </body>
    <!----Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> and <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> and <a href="https://www.flaticon.com/authors/kirill-kazachek" title="Kirill Kazachek">Kirill Kazachek</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>-->
    <script>
    function reducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        goals: []
      };
      var action = arguments.length > 1 ? arguments[1] : undefined;
    
      switch (action.type) {
        case actions.GOAL_ADD:
          // insert command to add goals
          var newGoal = {
            title: action.payload.title,
            time: action.payload.time,
            duration: action.payload.duration,
            complete: false,
            id: ++lastId
          };
          
          return _objectSpread(_objectSpread({}, state), {}, {
            goals: [].concat(_toConsumableArray(state.goals), [newGoal]).sort(function (goal) {
              return goal.time + goal.duration * 1000;
            })
          });
          break;
    
        case actions.GOAL_COMPLETE:
          console.log("goal finish  " + action.payload);
          var newGoals = state.goals;
          var index = newGoals.findIndex(function (goal) {
            return goal.id == action.payload.id;
          });
          newGoals[index].complete = !newGoals[index].complete;
          console.log(newGoals);
          return _objectSpread(_objectSpread({}, state), {}, {
            goals: newGoals
          });
          break;
    
        default:
          return state;
          break;
      }
    }
    `+scripts+`</script>
    <style>`+styles+`</style>

  </html>
  `
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
      {
        enableScripts: true
      } // Webview options. More on these later.
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

  // Handle messages from the webview
  currentPanel.webview.onDidReceiveMessage(
    message => {
      switch (message.command) {
        case 'createTimedGoal':
          let newId = getNewId(context);
          let newGoal = createTimedGoal(message.time, message.name, message.duration, message.complete, newId);
          addTimedGoal(context, newGoal);
          currentPanel.webview.postMessage({ command: 'createTimedGoal', time: message.time, name: message.name, duration: message.duration, complete: message.complete, id: newId });
          return;
        case 'showTimer':
          showTimer(context);
          return;
        case 'deleteTimedGoal':
          deleteTimedGoal(message.id, context);
          return;
        case 'completeTimedGoal':
          completeTimedGoal(message.id, context);
          return;
        case 'getTimedGoals':
          let goals = async function() {
            return await getTimedGoals(context);
          }.then( () => {
            currentPanel.webview.postMessage({ command: 'getTimedGoals', goals: goals });
            return;
          })
      }
    },
    undefined,
    context.subscriptions
  );
}

module.exports = {
  showTimer,
  viewUI
}
