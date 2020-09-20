import { Body, Controller, Post } from "@nestjs/common";
import { LogInDto } from "./login.dto"
import { SignInDto } from "./signin.dto"
import UsuarioService from "./usuario.service";

@Controller('v1/oauth')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Post('signin')
    async signIn(@Body() dto: SignInDto): Promise<string> {
        return this.usuarioService.RegistrarUsuario(dto.email, dto.contraseña);
    }

    @Post('token')
    async login(@Body() dto: LogInDto) {

    }
}