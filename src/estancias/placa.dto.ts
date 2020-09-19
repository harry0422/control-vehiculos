import { MaxLength } from 'class-validator'

export class PlacaDto {
    
    @MaxLength(8)
    numeroPlaca: string;
}