import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap,tap,map } from 'rxjs/operators';
import { LoginForm } from '../../interfaces/login-form';
import { Perfil } from '../../interfaces/perfil';
import { UsuarioLogin } from '../../models/usuarioLogin';


const baseUrl = environment.base_url;

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService
{
    private _authenticated: boolean = false;
    private _rol:string='';
    private _usuario:string='';
    private _perfil:Perfil={};

    public usuarioLogin!:UsuarioLogin; 


    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _router: Router
    )
    { 
        this.consultaPerfil(this.usuario).subscribe(res=>{
            this._perfil=res;
        });
    }

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('token') ?? '';
    }

    get autenticado():boolean {
        return this._authenticated;
    }

    get rol():string{
        return this._rol;
    }

    get usuario():string{
        return localStorage.getItem('email') || ''
    }

    get token(): string{
        return localStorage.getItem('token') || '';
    }

    get perfil():Perfil{
       
        return this._perfil;
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /** 
     * @param email
      */ 
    //
   forgotPassword(email: string): Observable<any>
   {
       return this._httpClient.post('api/auth/forgot-password', email);
   }

   /**
    * Reset password
    *
    * @param password
    */
   resetPassword(password: string): Observable<any>
   {
       return this._httpClient.post('api/auth/reset-password', password);
   }
    /**
     * Sign in
     *@param credentials
     */
    signIn(formData:LoginForm)
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('El usuario ya inició sesion.');
        }

        return this._httpClient.post(`${ baseUrl }/usuarios/login`,formData)
                .pipe(
                    tap((resp:any)=>{
                           if(resp.token){
                               this.accessToken    = resp.token
                               this._authenticated = true
                               this._rol = resp.rol; 
                               this._usuario=resp.email;    
                               localStorage.setItem('expiracion', resp.expiracion)  
                               localStorage.setItem('menu', JSON.stringify(resp.menu))  
                               localStorage.setItem('email', resp.email)  
                           }
                        }
                    )
                )
    }
    
    /**
     * Sign in using the access token
     */
     signInUsingToken():Observable<boolean>
     {

         // Renew token
         return this._httpClient.get(`${ baseUrl }/usuarios/validate`, {
             headers: {
                    'Authorization': `Bearer ${this.token}`
                }
        }).pipe(
            switchMap( (resp:any) => {
                this.accessToken    =   resp.token
                this._rol = resp.rol; 
                this._usuario=resp.email;    
                this._authenticated =   true 
                localStorage.setItem('expiracion', resp.expiracion)  
                localStorage.setItem('menu', JSON.stringify(resp.menu)) 
                localStorage.setItem('email', resp.email)  
                return of(true);
            }),
            catchError(() => {
                  this._router.navigateByUrl('/login');
                return of(false)
            }),
        );
     }
 
     /**
      * Sign out
      */
     signOut(): Observable<any>
     {
         // Remove the access token from the local storage
         localStorage.removeItem('token');
         // Remove el menu
         localStorage.removeItem('menu');
        // Remove el titulo
        localStorage.removeItem('titulo');
        // Remove el titulo
        localStorage.removeItem('subtitulo');
        // Remove el titulo
        localStorage.removeItem('expiracion');

        localStorage.removeItem('email');
         // Set the authenticated flag to false
         this._authenticated = false;
 
         // Return the observable
         return of(true);
     }
 
     /**
      * Sign up
      *
      * @param user
      */
     signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
     {
         return this._httpClient.post('api/auth/sign-up', user);
     }
 
     /**
      * Unlock session
      *
      * @param credentials
      */
     unlockSession(credentials: { email: string; password: string }): Observable<any>
     {
         return this._httpClient.post('api/auth/unlock-session', credentials);
     }

     /**
      * Perfil del usuario
      */
    consultaPerfil(usuario:string):Observable<Perfil>{
        
       return this._httpClient.get<Perfil>(`${ baseUrl }/perfiles/${usuario}`,{
            headers:{
                'Authorization':`Bearer ${ this.token }`
            }
        }).pipe(
            map(res=>{
                return res;
            })
        );
    } 

    crearPerfil(data:Perfil): Observable<any>{
        return this._httpClient.post(`${ baseUrl }/perfiles`,data,{
            headers:{
                'Authorization':`Bearer ${ this.token }`
            }
        }).pipe(
            map(res=>{
                return res;
            })
        )
     }

    ActualizarPerfil(data:Perfil): Observable<any>{
        console.log(data);
        return this._httpClient.put(`${ baseUrl }/perfiles`,data,{
            headers:{
                'Authorization':`Bearer ${ this.token }`
            }
        }).pipe(
            map(res=>{
                return res;
            }
                )
        )
     }



}
