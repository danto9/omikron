/// <reference path="../typings/angular2/angular2" />

import {Component, View, bootstrap, For} from 'angular2/angular2';

@Component({
    selector: 'file-explorer',
    injectables: [For]
})
@View({
   templateUrl: 'FileExplorer.html'
})
class FileExplorerComponent{
   name: string
   
   constructor(){
      this.name = "Daniel"
   }
}

bootstrap(FileExplorerComponent)