// VSCode import
const vscode = require('vscode');

// https://stackoverflow.com/questions/13601737/how-to-convert-milliseconds-into-a-readable-date-minutesseconds-format
function msToStr(ms) {
  const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
  const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
  const string = hours + " hours " + minutes + " minutes " + seconds + "seconds";
  return string;
}

function remainingTime(goal) {
  let now = 25334;
  let timeElapsed = now - goal.startTime;
  let timeRemaining = goal.duration - timeElapsed;
  return timeRemaining;
}

function createProgressBar(goal) {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: `${goal.name} ${remainingTime(goal)}`,
    cancellable: true
  }, (progress, token) => {

    //const increment = 1 / (remainingTime(goal) / 1000)

    token.onCancellationRequested(() => {
      console.log(`${goal.name}'s progress bar was cancelled.`);
    });

    //let progressing = true;
    progress.report({ increment: 0 });
    /*
    const loop = async() => {
      while (progressing) {
        await new Promise(r => setTimeout(r, 1000));
        progress.report({ increment: increment, message: `${goal.name} ${msToStr(remainingTime(goal))}` });
        if (remainingTime(goal) <= 0) {
          progressing = false;
        }
      }
    }*/
    const p = new Promise(resolve => {
      setTimeout(() => {
        //progressing = false;
        resolve();
      }, 5000);
    });

    return p;
  });

}

module.exports = {
	createProgressBar
}