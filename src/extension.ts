import * as vscode from 'vscode';
import * as eipw from "eipw-lint-js";
import * as path from "path";

import config from './config';

export function activate(context: vscode.ExtensionContext) : void {
	console.log("EIPw for VSCode activated");

	let timeout: NodeJS.Timer | undefined = undefined;

	const errorStyleTypes : { [key: string]: vscode.TextEditorDecorationType } = {};
	
	for (let errorType in config.errorTypes) {
		errorStyleTypes[errorType] = vscode.window.createTextEditorDecorationType(config.errorStyling[errorType]);
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
		for (let errorType in config.errorTypes) {
			decorationOptions[errorType] = [];
		}

		const result = await eipw.lint([ activeEditor.document.uri.fsPath ]);
		console.log(activeEditor.document.uri.fsPath);
		console.log(JSON.stringify(result, null, 2));

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

			for (let errorType in config.errorTypes) {
				if ('markdown-link-first' === errorType) {
					decorationOptions[errorType].push({ range: activeEditor.document.lineAt(snippet.slices[0].line_start - 1).range, hoverMessage: formatted });
				}
			}
		}
		
		for (let errorType in config.errorTypes) {
			activeEditor.setDecorations(errorStyleTypes[errorType], decorationOptions[errorType]);
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