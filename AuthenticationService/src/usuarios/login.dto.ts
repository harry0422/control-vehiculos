import { MaxLength } from "class-validator";

export class LogInDto {
    
    @MaxLength(30)
    email: string;
    
    @MaxLength(30)
    contraseña: string;
}