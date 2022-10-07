import * as vscode from 'vscode';

export const getApiPingWebsites = () => {
  return vscode.workspace.getConfiguration('BlockTester').get('listOfWebsitesToPing', '');
};
