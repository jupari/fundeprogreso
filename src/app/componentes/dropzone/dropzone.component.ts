import { Component, Input, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneCtrlComponent implements OnInit {

  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public type: string = 'component';

  public disabled: boolean = false;

  @Input('configDropzone') config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true
  };

  @Output() resFiles: EventEmitter<File[]> = new EventEmitter()





  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;


  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 0 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(args: any): void {
    //console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    //console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
		this.files.push(args[0]);
    this.resFiles.emit(this.files);
  }

  public onRemove(arg: File):void{
    this.files = this.files.filter((ev:File)=>{
       return ev.name!==arg.name
    })
    this.resFiles.emit(this.files);
  }

}
