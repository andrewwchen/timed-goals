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
	context.globalState.update('data', {goals:[ ]});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timedgoals" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('timedgoals.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from TimedGoals!');
	});

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

	let testCommand2 = vscode.commands.registerCommand('timedgoals.createProgressBar', function(){
		let item = libCommands.createTimedGoal(Date.now() - 5000, "This is the name", 10, false);
		libCommands.addTimedGoal(context, item);
		libCommands.createProgressBar(context.globalState.get('data').goals[0])
	});

	let viewUI = vscode.commands.registerCommand('timedgoals.viewUI', function(){
		libCommands.viewUI(context);
	});

	// Push all functions so that VSCode knows about them
	context.subscriptions.push(disposable);
	context.subscriptions.push(testCommand2);
	context.subscriptions.push(testCommand);
	context.subscriptions.push(viewUI);
	libCommands.viewUI(context);
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
