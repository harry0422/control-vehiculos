import { MaxLength } from "class-validator";

export class VehiculoResidenteDto {
    @MaxLength(8)
    placa: string;
}