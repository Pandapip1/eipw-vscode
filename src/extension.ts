import * as vscode from 'vscode';
import * as eipw from "eipw-lint-js";

import config from './config';

export function activate(context: vscode.ExtensionContext) : void {
	console.log("EIPw for VSCode activated");

	let timeout: NodeJS.Timer | undefined = undefined;

	const errorStyleTypes : { [key: string]: vscode.TextEditorDecorationType } = {};
	
	for (let errorLevel in config.errorLevels) {
		errorStyleTypes[errorLevel] = vscode.window.createTextEditorDecorationType(config.errorLevels[errorLevel]);
	}

	let activeEditor = vscode.window.activeTextEditor;

	async function updateDecorations() {
		if (!activeEditor) {
			return;
		}

		let trueFileName = activeEditor.document.fileName.split("/").pop()?.split("\\").pop();

		// If not an EIP: return
		if (!trueFileName?.toLowerCase().endsWith(".md") || !trueFileName?.toLowerCase().startsWith("eip-")) {
			return;
		}
		
		const decorationOptions:  { [key: string]: vscode.DecorationOptions[] } = {};
		for (let errorLevel in config.errorLevels) {
			decorationOptions[errorLevel] = [];
		}

		const result = await eipw.lint([ activeEditor.document.uri.fsPath ]);
		console.log(`Active path: ${activeEditor.document.uri.fsPath}`);
		console.log(`Raw eipw output: ${JSON.stringify(result, null, 2)}`);

		for (let snippet of result) {
			let formatted;

			try {
				formatted = eipw.format(snippet);
			} catch {
				formatted = snippet.title?.label;
			}

			if (!formatted) {
				formatted = "Failed to render diagnostic. This is a bug in eipw.";
			}
			
			let errorLevel: string = snippet.footer?.at(0)?.annotation_type || snippet.title?.annotation_type;
			console.log(`${errorLevel}: ${formatted}`);
			if (!errorLevel || !(errorLevel.toLowerCase() in decorationOptions)) {
				errorLevel = 'help';
			} else {
				errorLevel = errorLevel.toLowerCase();
			}

			if (snippet.title?.id) {
				formatted = `Error[${snippet.title?.id}]: ${formatted}`;
			} else {
				formatted = `Error: ${formatted}`;
			}

			// Currently bugged for some reason
			if (snippet.title?.id === 'preamble-file-name') {
				continue;
			}

			// Let users know it's okay to have no EIP number before submitting
			if (snippet.title?.id === 'preamble-eip') {
				formatted = `Info: EIP numbers will be provided by EIP editors. Do not self-assign EIP numbers.`;
				errorLevel = 'good';
			}

			// Let users know it's okay to have no EIP number before submitting
			if (snippet.title?.id === 'preamble-eip') {
				formatted = `Info: EIP numbers will be provided by EIP editors once you submit a Pull Request. Do **not** self-assign EIP numbers.`;
				errorLevel = 'good';
			}

			// Let users know it's okay to not have a discussions-to before submitting
			if (snippet.title?.id === 'preamble-re-discussions-to') {
				formatted = `Info: It is okay to not have a discussions-to link before submitting. Once you submit a Pull Request, please create a thread on https://ethereum-magicians.org/.`;
				errorLevel = 'good';
			}

			decorationOptions[errorLevel].push({ range: activeEditor.document.lineAt(snippet.slices[0].line_start - 1).range, hoverMessage: formatted });
		}
		
		for (let errorLevel in config.errorLevels) {
			activeEditor.setDecorations(errorStyleTypes[errorLevel], decorationOptions[errorLevel]);
		}
	}

	function triggerUpdateDecorations(throttle = false) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		if (throttle) {
			timeout = setTimeout(updateDecorations, 500);
		} else {
			updateDecorations();
		}
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations(true);
		}
	}, null, context.subscriptions);
}

export function deactivate() {}