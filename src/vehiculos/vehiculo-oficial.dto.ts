import { MaxLength } from "class-validator";


export class VehiculoOficialDto {
    @MaxLength(8)
    placa: string;
}