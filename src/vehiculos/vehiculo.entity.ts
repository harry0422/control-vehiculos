import { SerializedPrimaryKey } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Entity, PrimaryKey, Property } from "mikro-orm";

@Entity()
export class Vehiculo {
    static OFICIAL = 'OFICIAL';
    static RESIDENTE = 'RESIDENTE';

    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    id!: string;
    
    @Property()
    placa: string;

    @Property()
    tipo: string;

    constructor(placa: string, tipo: string) {
        this.placa = placa;
        this.tipo = tipo;
    }

    static crearOficial(placa: string): Vehiculo {
        return new Vehiculo(placa, Vehiculo.OFICIAL);
    }

    static crearResidente(placa: string): Vehiculo {
        return new Vehiculo(placa, Vehiculo.RESIDENTE);
    }
}