import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const replaceTextCommands = [
		{ id: 'latexForHumans.bold', insert: '\\textbf{<text>}' },
		{ id: 'latexForHumans.italic', insert: '\\textit{<text>}' },
		{ id: 'latexForHumans.insertLink', insert: '\\href{url}{<text>}' },
		{ id: 'latexForHumans.color', insert: '{\\color{blue}<text>}' },
		{ id: 'latexForHumans.section', insert: '\\section{<text>}' },
		{ id: 'latexForHumans.subSection', insert: '\\subsection{<text>}' },
		{ id: 'latexForHumans.subSubSection', insert: '\\subsubsection{<text>}' },
		{ id: 'latexForHumans.paragraph', insert: '\\paragraph{<text>}' },
	];

	const insertTextCommands = [
		{ id: 'latexForHumans.insertFigure', insert: `\\begin{figure}[H]\n\t\\centering\n\t\\includegraphics[width=1\\textwidth]{path/to/file.png}\n\t\\caption{Enter Caption}\n\\end{figure}` },
		{ id: 'latexForHumans.insertNumberedList', insert: `\\begin{itemize}\\setlength\\itemsep{0pt}\n\t\\item\n\\end{itemize}` },
		{ id: 'latexForHumans.insertBulletList', insert: `\\begin{enumerate}\\setlength\\itemsep{0pt}\n\t\\item\n\\end{enumerate}` },
	];

	for (const cmd of replaceTextCommands) {
		const disposable = vscode.commands.registerCommand(cmd.id, () => {

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const { selection } = editor;
			const text = editor.document.getText(selection);

			const newText = cmd.insert.replace(`<text>`, text);

			editor.edit(editBuilder => {
				if (text) {
					editBuilder.replace(selection, newText);
				} else {
					editBuilder.insert(selection.start, newText);
				}
			});

		});
		context.subscriptions.push(disposable);
	}

	for (const cmd of insertTextCommands) {
		const disposable = vscode.commands.registerCommand(cmd.id, () => {

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const { selection } = editor;
			editor.edit(editBuilder => {
				editBuilder.insert(selection.start, cmd.insert);
			});

		});
		context.subscriptions.push(disposable);
	}
}

export function deactivate() { }