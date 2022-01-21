import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/core/interfaces/documento';
import { ModalDocService } from 'src/app/core/services/componentes/modal-doc.service';
import { DocumentosService } from 'src/app/core/services/documentos/documentos.service';
import Swal from 'sweetalert2';

declare function dropzone():any;

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  listadoDocumentos:Documento[]=[];
  documento!:Documento;

  constructor(private smodalDocService: ModalDocService,
              private documentosService:DocumentosService) { }

  ngOnInit(): void {
    dropzone();
    this.consultarDocumento()
  }

  mostrarModal(){
    this.smodalDocService.abrirModal();
  }

  consultarDocumento(){
    this.documentosService.consultarDocs()
          .subscribe(res=>{
            this.listadoDocumentos=res;
          })
  }

  eliminarDocumento(arg:Documento){
    Swal.fire({
      title: '¿Borrar Grupo?',
      text: `Esta seguro de borrar este documento ${arg.titulo} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentosService.eliminarDocs(arg)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El documento ${arg.titulo} se borró con éxito.`,
            'success');
            this.consultarDocumento();
        })       
      }
    })
  }

  editarDocumento(arg:Documento){
    this.documento=arg;
    this.mostrarModal();
  }

}
