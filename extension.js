// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "codereviewer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('codereviewer.JkReview', function () {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor
    const document = editor.document
    const selection = editor.selection
    const text = document.getText(selection)

    const rules = [/:[^\s]/, /\)\{/, /\{\w|\w\}/,/\}\s\)/, /[\u4e00-\u9fa5]\w/, /,[^\d]/]

    const custom = vscode.workspace.getConfiguration("codeReview").get('rules') || []

    for (let i of custom) {
      rules.push(new RegExp(i))
    }

    let sentences = text.split('\n')
    let i = 0
    const errors = {}
    let message = []

    for (let sentence of sentences) {
      for (let rule of rules) {
        if (rule.test(sentence)) {
          i++
          errors[rule] = sentence
        }
      }
    }

    Object.keys(errors).forEach((error) => {
      message.push(`${error}:${errors[error]};`)
    })

    // Display a message box to the user
    vscode.window.showErrorMessage(`code Reviewer complete, You have ${i} error in the file`);
    vscode.window.showErrorMessage(`${message}`)
  });

  let lint = vscode.commands.registerCommand('codereviewer.lint', function () {
    let command = ''
    command = 'yarn lint'
    // 创建命令台并发送指令api
    const terminal = vscode.window.createTerminal()
    terminal.show(true)
    terminal.sendText(command)
    vscode.window.showInformationMessage(`exec yarn lint!`);
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(lint);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
