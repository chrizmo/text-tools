'use babel';

//import TextToolsView from './text-tools-view';
import { CompositeDisposable } from 'atom';

export default {

  //textToolsView: null,
  //modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.textToolsView = new TextToolsView(state.textToolsViewState);
    /*this.modalPanel = atom.workspace.addModalPanel({
      item: this.textToolsView.getElement(),
      visible: false
    });*/

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      // 'text-tools:toggle': () => this.toggle(),
      'text-tools:Convert to numbered list': () => this.create_list(null, true),
      'text-tools:Convert to unumbered list': () => this.create_list(symbol="-")

    }));
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    //this.textToolsView.destroy();
  },

  /*serialize() {
    return {
      textToolsViewState: this.textToolsView.serialize()
    };
  },
*/

  create_list(symbol = "", numbers = false){
    console.log("Ran numbered list!");
    if (editor = atom.workspace.getActiveTextEditor()){
      text = editor.getSelectedText().replace(/^\s?[\d\-]+\.?\s/gm, "");

      text_lines = text.split("\n");

      text_changed = "";

      for(i = 0; i < text_lines.length; i++){
        if (numbers) {
          text_changed += " " + (i + 1) + ". " + text_lines[i];
        }else{
          text_changed += " " + symbol + " " + text_lines[i];
        }
      }

      editor.insertText(text_changed);
    }

  },

  toggle() {
    /*return (
      // this.modalPanel.isVisible() ?
      //this.modalPanel.hide() :
      //this.modalPanel.show()
    );*/
  }

};
