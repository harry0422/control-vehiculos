import { ObjectId } from "@mikro-orm/mongodb";
import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "mikro-orm";


@Entity()
export class Estancia {
    static ESTADO_ACTIVO: string = 'ACTIVA';
    static ESTADO_CERRADO: string = 'CERRADA';

    @PrimaryKey()
    _id: ObjectId;

    @SerializedPrimaryKey()
    id!: string;

    @Property()
    fechaIngreso: Date;

    @Property()
    fechaSalida: Date | null;

    @Property()
    vehiculo: string;

    @Property()
    estado: string;

    constructor(vehiculo: string) {
        this.vehiculo = vehiculo;
        this.fechaIngreso = new Date();
        this.fechaSalida = null;
        this.estado = Estancia.ESTADO_ACTIVO;
    }

    cerrar(): void {
        this.fechaSalida = new Date();
        this.estado = Estancia.ESTADO_CERRADO;
    }
}