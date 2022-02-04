export interface Examen{
    idExamen        :number;
    idTema          :number;
    tema            :string;
    nombre          :string;
    puntuacion      :number;
    instrucciones   :string;
    Activo          :boolean;
}

export interface ExamenBD{
    idExamen        :number;
    idTema          :number;
    nombre          :string;
    puntuacion      :number;
    instrucciones   :string;
    Activo          :boolean;
}