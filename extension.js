// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// const { createExpressionWithTypeArguments } = require('typescript');
const vscode = require('vscode');
const libCommands = require('./libCommands')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Create global state on startup
	// context.globalState.update('data', {goals:[ ]});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timedgoals" is now active!');



	let testCommand = vscode.commands.registerCommand('timedgoals.testCommand', function(){
		// Create new item to put in store
		let newItem = libCommands.createTimedGoal(Date.now(), "This is the name", 1, false);

		// Put new item in store
		libCommands.addTimedGoal(context, newItem);

		// Get first task name from global store
		let nameOfFirstGoal = context.globalState.get('data').goals[0].name;

		// Get length of goals array
		let numberOfGoals = context.globalState.get('data').goals.length;

		// Current Time
		let currentTime = context.globalState.get('data').goals[0].time;

		// Print first task name on command
		vscode.window.showInformationMessage(nameOfFirstGoal + " Length: " + numberOfGoals + "| Current Time: " + currentTime);
	});

	let showTimer = vscode.commands.registerCommand('timedgoals.showTimer', function(){
		libCommands.showTimer(context);
		//let goals = context.globalState.get('data').goals;

	});

	let viewUI = vscode.commands.registerCommand('timedgoals.viewUI', function(){
		libCommands.viewUI(context);
	});

	// Push all functions so that VSCode knows about them
	context.subscriptions.push(viewUI);
	context.subscriptions.push(showTimer);
	libCommands.viewUI(context);
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
