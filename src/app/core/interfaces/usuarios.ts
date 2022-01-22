export interface Usuarios{
    NombreUsuario     :string;
    NombreCompleto    :string;
    Email             :string;
    TipoRol           :string;
    activo            :boolean;
 }

 export interface CrearUsuario{
    NombreUsuario?       :string;
    Email                :string;
    Password?            :string;
    NombreCompleto?      :string;
    DocumentoIdentidad?  :string;
    Telefono?            :string;
    Direccion?           :string;
    Municipio?           :string;
    idRol?               :string;
    TipoRol?             :string;
    activo?              :boolean;
 }