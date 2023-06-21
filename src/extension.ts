import * as vscode from 'vscode';
import * as eipw from 'eipw-lint-js';
import * as path from 'path';

import config from './config';

export function activate(context: vscode.ExtensionContext) : void {
	console.debug('EIPw for VSCode activated');

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

		let trueFileName = activeEditor.document.fileName.split('/').pop()?.split('\\').pop();

		// If not an EIP: return
		if (!trueFileName?.toLowerCase().endsWith('.md') || !trueFileName?.toLowerCase().startsWith('eip-')) {
			return;
		}
		
		const decorationOptions:  { [key: string]: vscode.DecorationOptions[] } = {};
		for (let errorLevel in config.errorLevels) {
			decorationOptions[errorLevel] = [];
		}

		console.debug(`Current file: ${activeEditor.document.fileName}`);

		const eipdir = path.resolve(activeEditor.document.fileName, '..');
		const workdir = process.cwd();

		console.debug(`EIP directory: ${eipdir}`);
		console.debug(`Current Working directory: ${workdir}`);

		process.chdir(eipdir);
		const result = await eipw.lint([ activeEditor.document.fileName ]);
		process.chdir(workdir);

		console.debug(`Raw eipw output: ${JSON.stringify(result, null, 2)}`);

		let isNewEip = result.filter((snippet: any) => snippet.title?.id === 'preamble-eip' && snippet.slices[0].source === 'eip: <to be assigned>').length > 0;

		for (let snippet of result) {
			let formatted;

			try {
				formatted = eipw.format(snippet) as string;
			} catch {
				formatted = snippet.title?.label;
			}

			if (!formatted) {
				formatted = 'Failed to render diagnostic. This is a bug in eipw.';
			}

			formatted = formatted.replace(' | ', '\n');
			
			let errorLevel: string = snippet.footer?.at(0)?.annotation_type || snippet.title?.annotation_type;
			console.debug(`${errorLevel}: ${formatted}`);
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

			// Let users know it's okay to have no EIP number before submitting
			if (snippet.title?.id === 'preamble-eip' && isNewEip) {
				formatted = `Info: EIP numbers will be provided by EIP editors. Do not self-assign EIP numbers.`;
				errorLevel = 'good';
			}

			// Let users know it's okay to not have a discussions-to before submitting
			if (snippet.title?.id === 'preamble-re-discussions-to' && isNewEip && snippet.slices[0].source === 'discussions-to: <URL>') {
				formatted = `Info: It is okay to not have a discussions-to link before submitting. Once you submit a Pull Request, please create a thread on https://ethereum-magicians.org/.`;
				errorLevel = 'good';
			}

			try {
				decorationOptions[errorLevel].push({ range: activeEditor.document.lineAt(snippet.slices[0].line_start - 1).range, hoverMessage: formatted });
			} catch (e) {
				console.error(e);
			}
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