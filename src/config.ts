import * as vscode from 'vscode';

export default {
    'errorLevels': {
        'good': { // Fake error level
            'textDecoration': 'underline dotted #00FF00',
            'isWholeLine': true,
        },
        'help': {
            'textDecoration': 'underline dotted #00D2FF',
            'isWholeLine': true,
        },
        'note': {
            'textDecoration': 'underline dotted #00D2FF',
            'isWholeLine': true,
        },
        'info': {
            'textDecoration': 'underline wavy #00D2FF',
            'isWholeLine': true,
        },
        'warning': {
            'textDecoration': 'underline wavy #D2FF00',
            'isWholeLine': true,
        },
        'error': {
            'textDecoration': 'underline wavy #FF0000',
            'isWholeLine': true,
        },
    } as { [key: string]: vscode.DecorationRenderOptions }
};