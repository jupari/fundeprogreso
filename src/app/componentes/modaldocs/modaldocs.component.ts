import { Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Documento } from 'src/app/core/interfaces/documento';

import { Grupo } from 'src/app/core/interfaces/grupos';
import { Iarchivo } from 'src/app/core/interfaces/iarchivo';


import { iMunicipios,Municipios } from 'src/app/core/mocks/municipios';
import { ModalDocService } from 'src/app/core/services/componentes/modal-doc.service';
import { DocumentosService } from 'src/app/core/services/documentos/documentos.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';

declare function dropzone():any;

@Component({
  selector: 'app-modaldocs',
  templateUrl: './modaldocs.component.html',
  styleUrls: ['./modaldocs.component.css']
})
export class ModaldocsComponent implements OnInit, OnChanges {

  constructor(public  smodalDoc: ModalDocService,
              private fb: FormBuilder,
              private grupoService:GrupoService,
              private documentoService:DocumentosService) { }
  

  termino:string='';
  MunicipiosSugeridos:iMunicipios[] = []; 
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false;
  limpiarDropZone:boolean=false;
  archivo!:Iarchivo;
  mostrarIconoArchivo:boolean=false;
  grupos:Grupo[]=[];  

  

  formDocs!:FormGroup;

  
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'application/pdf',
    createImageThumbnails: true,

  };


  @Input() documentoEditar!:Documento;
  @Output() documentoRes: EventEmitter<Documento> = new EventEmitter();

  @ViewChild('selectgrupo') selectGrupo!:ElementRef;



  ngOnInit(): void {

    //carga el dropzone
    dropzone();
    //carga los grupos
    this.listarGrupos();
    this.formDocs= this.fb.group({
        idDocumento:    [0],
        idGrupo:        [0,[Validators.required]],
        nombreGrupo:    [''],
        idCia:          [0],
        titulo:         ['',[Validators.required]],
        descripcion:    ['',[Validators.required]],
        codMunicipio:   ['',[Validators.required]],
        archivo:        [''],
        nombreArchivo:  [''],
        activo:         [1]     
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.documentoEditar.currentValue){
      this.cargarDocumento(this.documentoEditar);
    }
  }

  onChangeSelect(ev:any){
    console.log(ev.target[0].value);
  }

  //Listado de grupos
  listarGrupos(){
    this.grupoService.consultarGrupos()
        .subscribe(res=>{
          this.grupos=res;
        })
  }

  cerrarModal(){
    this.smodalDoc.cerrarModal()
  }

  buscar(termino:string){
    
    this.mostrarSugerencia=false;
    this.mostrarResultados=true
    this.termino=termino;
  }

  BuscarMcipio(termino:string){
    this.mostrarSugerencia=true;
    if (termino==''){
      this.mostrarSugerencia=false;
      this.mostrarResultados=false;
      this.MunicipiosSugeridos=[];  
    }else{
      this.MunicipiosSugeridos = Municipios.filter(valor=>
              valor.nombre.toLocaleLowerCase().includes(termino.toLocaleLowerCase())
            ).splice(0,7);
    }
  }

  traerFiles(archivo:File[]){
    const grupo = this.grupos.filter(res=>{return res.idGrupo==this.formDocs.get('idGrupo')?.value})
    const municipio = this.termino
    const idGrupo = this.formDocs.get('idGrupo')?.value;
    const titulo = this.formDocs.get('titulo')?.value;

    if (grupo==null || municipio==null){return;}
    //almacena los valores en la variable para enviarla al servico
    this.archivo = {
      grupo:grupo[0].nombre_Grupo,
      idGrupo:idGrupo,
      titulo:titulo,
      municipio:municipio,
      file:archivo[0]
    }
    //Consumo el servicio
    this.documentoService.uploadArchivo(this.archivo)
          .then(res=>{
            //seteo el formulario para enviarlo a guardar
            this.formDocs.get('archivo')?.setValue(res.rutaArchivo);
            this.formDocs.get('nombreArchivo')?.setValue(res.nombreArchivo);
          })
  }

  guardarDocs(){
      this.formDocs.get('codMunicipio')?.setValue(this.termino);
      if(this.formDocs.invalid){return;}
      this.documentoService.crearDocs(this.formDocs.value)
            .subscribe(res=>{
              this.limpiar();
              this.documentoRes.emit(res);
            })
  }

  cargarDocumento(doc:Documento){
    if(this.formDocs.value){
      this.formDocs.get('idDocumento')?.setValue(doc.idDocumento);
      this.formDocs.get('idGrupo')?.setValue(doc.idGrupo);
      this.formDocs.get('nombreGrupo')?.setValue(doc.nombreGrupo);
      this.formDocs.get('titulo')?.setValue(doc.titulo);
      this.formDocs.get('descripcion')?.setValue(doc.descripcion);
      this.formDocs.get('codMunicipio')?.setValue(doc.codMunicipio);
      this.termino=doc.codMunicipio;
      this.formDocs.get('nombreArchivo')?.setValue(doc.nombreArchivo);
      this.formDocs.get('archivo')?.setValue(doc.archivo)
      if(doc.archivo){
        this.mostrarIconoArchivo = true;
      }else{
        this.mostrarIconoArchivo = false;
      }
      
    }
  }
  	
  limpiar(){
    this.formDocs.get('idDocumento')?.setValue(0);
    this.formDocs.get('idGRupo')?.setValue(0);
    this.formDocs.get('titulo')?.setValue('');
    this.formDocs.get('descripcion')?.setValue('');
    this.formDocs.get('codMunicipio')?.setValue('');
    this.formDocs.get('nombreArchivo')?.setValue('');
    this.formDocs.get('archivo')?.setValue('');
    
    this.limpiarDropZone = true;
    this.termino='';
    this.selectGrupo.nativeElement.options.item(0).selected = 'selected';
    this.mostrarIconoArchivo = false;
  }
 
}
