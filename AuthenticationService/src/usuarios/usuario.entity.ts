import { ObjectId } from "@mikro-orm/mongodb";
import { Entity, PrimaryKey, Property, SerializedPrimaryKey } from "mikro-orm";

@Entity()
export class Usuario {

   @PrimaryKey()
   _id: ObjectId;

   @SerializedPrimaryKey()
   id!: string;
    
   @Property()
   email: string;

    @Property()
    contraseña: string;

    @Property()
    creationDate: Date;

    constructor(email: string, contraseña: string) {
        this.email = email;
        this.contraseña = contraseña;
        this.creationDate = new Date();
    }
}