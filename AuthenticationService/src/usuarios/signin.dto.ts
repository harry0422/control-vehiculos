import { MaxLength } from "class-validator";

export class SignInDto {
    
    @MaxLength(30)
    email: string;
    
    @MaxLength(30)
    contraseña: string;
}