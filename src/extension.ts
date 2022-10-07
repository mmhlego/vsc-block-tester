import * as vscode from 'vscode';
import { SidebarProvider } from './view/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  sidebarProvider.setContext(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('blocktester-sidebar', sidebarProvider)
  );
}

export function deactivate() {}
