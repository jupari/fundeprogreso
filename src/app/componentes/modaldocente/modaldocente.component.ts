import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Evento } from 'src/app/core/interfaces/evento';
import { ImagenEvento } from 'src/app/core/interfaces/eventoBD';
import { EventoArchivo, EventoArchivoDisplay } from 'src/app/core/interfaces/eventosarchivos';
import { Iarchivo } from 'src/app/core/interfaces/iarchivo';
import { Temario } from 'src/app/core/interfaces/temario';
import { Tema } from 'src/app/core/interfaces/temas';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import { TemarioService } from 'src/app/core/services/configuracion/temario.service';


@Component({
  selector: 'app-modaldocente',
  templateUrl: './modaldocente.component.html',
  styleUrls: ['./modaldocente.component.css']
})
export class ModaldocenteComponent implements OnInit, OnChanges {

  formEvento:FormGroup;
  formMateriales:FormGroup;


  @Input() eventoEditar!:Evento;
  @Input() idMunicipio!:number;
  @Output() eventoGuardado:EventEmitter<boolean>=new EventEmitter();
  
  limpiarDropZone:boolean=false;
  limpiarDropZoneEvento:boolean=false;
  mostrarIconoImagenEvento:boolean=false;
  mostrarCarpetaMateriales:boolean=false;
  linkImagenEvento:string='';
  archivo!:Iarchivo;
  
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'application/pdf',
    dictRemoveFile: 'Eliminar archivo',
    createImageThumbnails: true,

  };

  configEvento: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'image/jpeg,image/png,image/jpg',
    dictRemoveFile: 'Eliminar archivo',
    createImageThumbnails: true,
  };

  constructor( public modalService:ModalService
              ,private fb:FormBuilder
              ,public cadmin:CAdminService
              ,private temasService:TemaService
              ,private temarioService:TemarioService
              ,private authService:AuthService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.eventoEditar.currentValue){
      this.cargarEvento(changes.eventoEditar.currentValue.event);
    }

    if(changes.idMunicipio){
      this.idMunicipio=changes.idMunicipio.currentValue
      this.consultarTemasxMunicipio(changes.idMunicipio.currentValue)
    }
  }



  ngOnInit(): void {

    //SE CONSULTA EL IDMUNICIPIO PARA SABER A QUE MUNICIPIO LE CORRESPONDE EL EVENTO
    this.idMunicipio=this.authService.perfil.idMunicipio


    this.formEvento=this.fb.group({
        idEvento:         [''],
        idMunicipio:      [this.idMunicipio],
        idTema:           [''],
        titulo:           ['',  [Validators.required,Validators.minLength(6)]],
        descripcion:      ['',  [Validators.required]],
        fecha_Ini:        ['',  [Validators.required]],
        fecha_Fin:        ['',  [Validators.required]],
        todoElDia:        [1,   [Validators.required]],
        imagen:           [''],
        nombreArchivo:    [''],
        link:             [''],
        colorEvento:      ['bg-info',   [Validators.required]]
    })  
    //this.formEvento.get('nombreArchivo').disable();

    this.formMateriales=this.fb.group({
      idArchivo:        [''],
      idEvento:         [''],
      idTema:           ['',[Validators.required]],
      idTemario:        ['',[Validators.required]],
      archivo:          [''],
      nombreArchivo:    [''],
      titulo:           [''],
      descripcion:      [''],
    })  
  }


  guardarEvento(){
    if(this.formEvento.invalid){
      return
    }

    if(this.formEvento.get('idEvento').value=='')
    {
      this.cadmin.guardarEvento(this.formEvento.value)
            .subscribe(res=>{
               if(res){
                 this.eventoGuardado.emit(true);
                 this.formEvento.get('idEvento').setValue(res.idEvento);
                 this.formMateriales.get('idEvento').setValue(res.idEvento); 
                 this.mostrarCarpetaMateriales=true
                 this.consultarTemasxMunicipio(this.formEvento.get('idMunicipio').value);
               } 
            })
    }else{
      console.log('formulario',this.formEvento.value);
      this.cadmin.EditarEvento(this.formEvento.value)
            .subscribe(res=>{
              if(res){
                this.eventoGuardado.emit(true);
              } 
     })
    }
  }

  validarCampos(nombreCampo:string){
    return this.formEvento.get(nombreCampo).invalid
              && this.formEvento.get(nombreCampo).touched              
  }

  validarCamposMateriales(nombreCampo:string){
    return this.formMateriales.get(nombreCampo).invalid
              && this.formMateriales.get(nombreCampo).touched              
  }


  cargarEvento(ev:any){
    const {  decription } = ev.extendedProps
    const start=new Date(ev.start).toISOString().substring(0, 10);
    const end =new Date(ev.end).toISOString().substring(0,10);
    this.mostrarCarpetaMateriales=true;
    //consumimos el servicio para editar el evento
    this.cadmin.consultarEventoxId(ev.id)
          .subscribe((res)=>{
            if(res.imagen!=''){
              this.mostrarIconoImagenEvento=true
              this.linkImagenEvento=res.imagen;
            }
            this.formEvento.patchValue({
              idEvento      :ev.id,
              idTema        :ev.id,
              titulo        :ev.title,
              descripcion   :decription,
              fecha_Ini     :start,
              fecha_Fin     :end,
              nombreArchivo :res.nombreArchivo,
              link          :res.link,
              todoElDia     :ev.allDay,
              colorEvento   : ev.classNames[1]
            });

          })
    //Se consume el servicio para traer los archivos por temas 
    this.cadmin.consultarArchivoGuardadosxTema(ev.id)
          .subscribe(res=>{
            this.archivosGuardados=res;
          })

    


  }

  temarioSeleccionado(ev:string){
    if(ev){
      this.consultarArchivosGuardados(this.formEvento.get('idEvento').value, this.formMateriales.get('idTema').value,+ev)
    }
    
  }


  traerFilesEvento(archivo:File[]){
    if(archivo.length==0){return}
    //Consumo el servicio
    const imagen:ImagenEvento={
      idEvento: this.formEvento.get('idEvento').value|| 0,
      imagen: archivo[0]
    }
     this.cadmin.uploadArchivoEvento(imagen)
           .then(res=>{
             //seteo el formulario para enviarlo a guardar
             if(res){
               this.formEvento.get('imagen').setValue(res.rutaArchivo);
               this.formEvento.get('nombreArchivo').setValue(res.nombreArchivo);
               this.linkImagenEvento=res.rutaArchivo
               this.mostrarIconoImagenEvento=true;
             } 
      })

  }

  limpiar(){
    this.formEvento.patchValue({
      idEvento:       '',
      idTema:         '',
      titulo:         '',
      descripcion:    '',
      fecha_Ini:      '',
      fecha_Fin:      '',
      todoElDia:      '1',
      imagen:         '',
      nombreArchivo:  '',
      link:           '',
      colorEvento:    ''
    });

    this.formMateriales.patchValue({
      idArchivo:        '',
      idEvento:         '',
      idTema:           '',
      idTemario:        '',
      archivo:          '',
      nombreArchivo:    '',
      titulo:           '',
      descripcion:      '',
    })

    this.limpiarDropZone=true;
    this.limpiarDropZoneEvento=true;
    this.mostrarIconoImagenEvento=false;
    this.archivosGuardados=[];

  }

  cerrarModal(){
    this.limpiar();
    this.modalService.cerrarModal();
  }

  //metodos de adicionar materiales

  temas:Tema[]=[];
  temarios:Temario[]=[];
  archivosGuardados:EventoArchivoDisplay[]=[];

  consultarTemasxMunicipio(id:number){
    if(id){
      this.temasService.consultarTemasxMunicipio(id)
              .subscribe(res=>{
                  this.temas=res;
              })
    }
  }

  

  temaSeleccionado(ev:any){
    if(ev){
      this.consultarTemariosxTemas(ev.target.value);
    }
  }

  consultarTemariosxTemas(id:number){
    if(id){
      this.temarioService.consultarxIdTema(id)
          .subscribe(res=>{
            this.temarios=res;
          })
    }
  }

  GuardarMateriales(){
    console.log(this.formMateriales.value);
  }

  traerFiles(archivo:File[]){
    if(archivo.length==0){return}
    if(this.formMateriales.invalid){
      this.formMateriales.markAllAsTouched()
      return;
    }
    const eventoArchivo:EventoArchivo={
      idArchivo       :this.formMateriales.get('idArchivo').value|| 0,
      idEvento        :this.formEvento.get('idEvento').value|| 0,
      idTema          :this.formMateriales.get('idTema').value|| 0,
      idTemario       :this.formMateriales.get('idTemario').value|| 0,
      archivo         :this.formMateriales.get('archivo').value|| '',
      nombreArchivo   :this.formMateriales.get('nombreArchivo').value|| '',
      titulo          :this.formMateriales.get('titulo').value|| '',
      descripcion     :this.formMateriales.get('descripcion').value|| '',
      file            :archivo[archivo.length-1]
    }
    //NO SIRVIO
    //Consumo el servicio
     this.cadmin.uploadArchivo(eventoArchivo)
           .then(res=>{
             //seteo el formulario para enviarlo a guardar
             const evArchivo:EventoArchivo={
               idArchivo: eventoArchivo.idArchivo,
               idEvento: eventoArchivo.idEvento,
               idTema: eventoArchivo.idTema,
               idTemario: eventoArchivo.idTemario,
               archivo: res.rutaArchivo,
               nombreArchivo: res.nombreArchivo,
               titulo:eventoArchivo.titulo,
               descripcion:eventoArchivo.descripcion
             }
             this.cadmin.guardarArchivos(evArchivo)
                    .subscribe(res=>{
                        this.consultarArchivosGuardados(eventoArchivo.idEvento,evArchivo.idTema,evArchivo.idTemario);
                    });
           })
  }

  consultarArchivosGuardados(idevento:number,idtema:number,idtemario:number){
    this.cadmin.consultarArchivosGuardados(idevento,idtema,idtemario)
            .subscribe(res=>{
              this.archivosGuardados=res;
            })
  }

  eliminarArchivo(ev:any){
    this.cadmin.EliminarArchivo(+ev.idArchivo)
        .subscribe(res=>{
          this.consultarArchivosGuardados(ev.idEvento,ev.idTema,ev.idTemario);
        })
  }
}
