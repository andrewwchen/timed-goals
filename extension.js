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
async function activate(context) {

	// Create global state on startup
	// context.globalState.update('data', {goals:[ ]});

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"timedgoals" is now active!');



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
	await libCommands.viewUI(context);
}


// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
