import * as vscode from 'vscode';

export default {
    'errorTypes': {
        'markdown-link-first': 'First mention of an EIP must be a link.', // eslint-disable-line
        'markdown-order-section': 'There are no extra sections and the sections are in the correct order.', // eslint-disable-line
        'markdown-re-eip-dash': 'Other EIPs are referenced using EIP-X, not EIPX or EIP X.', // eslint-disable-line
        'markdown-re-eip-not-erc': 'Other EIPs are referenced using EIP-X, not ERC-X.', // eslint-disable-line
        'markdown-rel-links': 'All URLs in the page are relative.', // eslint-disable-line
        'preamble-author': 'The author header is correctly formatted, and there is at least one GitHub user listed.', // eslint-disable-line
        'preamble-date-created': 'The created header is a date.', // eslint-disable-line
        'preamble-date-last-call-deadline': 'The last-call-deadline header is a date.', // eslint-disable-line
        'preamble-discussions-to': 'The discussions-to header is a valid URL.', // eslint-disable-line
        'preamble-eip': 'The eip header is a non-negative integer.', // eslint-disable-line
        'preamble-enum-category': 'The category header is a recognized value.', // eslint-disable-line
        'preamble-enum-status': 'The status header is a recognized value.', // eslint-disable-line
        'preamble-enum-type': 'The type header is a recognized value.', // eslint-disable-line
        'preamble-file-name': 'The file name reflects the EIP number.', // eslint-disable-line
        'preamble-len-description': 'The description header isn\'t too long.', // eslint-disable-line
        'preamble-len-title': 'The title header isn\'t too long.', // eslint-disable-line
        'preamble-list-author': 'The author header is a correctly formatted comma-separated list.', // eslint-disable-line
        'preamble-list-requires': 'The requires header is a correctly formatted comma-separated list.', // eslint-disable-line
        'preamble-no-dup': 'There are no duplicate headers.', // eslint-disable-line
        'preamble-order': 'The preamble headers are in the correct order.', // eslint-disable-line
        'preamble-re-description': 'The description doesn\'t contain "standard" or similar words.', // eslint-disable-line
        'preamble-re-discussions-to': 'The discussions-to header points to Ethereum Magicians', // eslint-disable-line
        'preamble-re-title': 'The title doesn\'t contain "standard" or similar words.', // eslint-disable-line
        'preamble-req': 'All required preamble headers are present.', // eslint-disable-line
        'preamble-req-category': 'The category header is present only when required.', // eslint-disable-line
        'preamble-req-last-call-deadline': 'The last-call-deadline header is present only when required.', // eslint-disable-line
        'preamble-req-withdrawal-reason': 'The withdrawal-reason header is present only when required.', // eslint-disable-line
        'preamble-requires-status': 'EIPs listed in requires have statuses further along than the current proposal.', // eslint-disable-line
        'preamble-trim': 'There is no extra whitespace around preamble fields.', // eslint-disable-line
        'preamble-uint-requires': 'The requires header is a sorted list of non-negative integers.', // eslint-disable-line
    } as { [key: string]: string },
    'errorStyling': {
        'markdown-link-first': { // eslint-disable-line
            'textDecoration': 'underline wavy #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'markdown-order-section': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'markdown-re-eip-dash': { // eslint-disable-line
            'textDecoration': 'underline wavy #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'markdown-re-eip-not-erc': { // eslint-disable-line
            'textDecoration': 'underline wavy #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'markdown-rel-links': { // eslint-disable-line
            'textDecoration': 'underline wavy #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-author': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-date-created': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-date-last-call-deadline': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-discussions-to': { // eslint-disable-line
            'textDecoration': 'underline dotted #00D2FF;',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-eip': { // eslint-disable-line
            'textDecoration': 'underline dotted #00D2FF',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-enum-category': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-enum-status': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-enum-type': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-file-name': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-len-description': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-len-title': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-list-author': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-list-requires': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-no-dup': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-order': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-re-description': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-re-discussions-to': { // eslint-disable-line
            'textDecoration': 'underline dotted #00D2FF;',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-re-title': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-req': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-req-category': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-req-last-call-deadline': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-req-withdrawal-reason': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-requires-status': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-trim': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions,
        'preamble-uint-requires': { // eslint-disable-line
            'textDecoration': 'underline solid #FF0000',
            'isWholeLine': true,
        } as vscode.DecorationRenderOptions
    } as { [key: string]: vscode.DecorationRenderOptions },
};