import { Body, Controller, Post } from "@nestjs/common";
import { LogInDto } from "./login.dto"
import { SignInDto } from "./signin.dto"
import UsuarioService from "./usuario.service";
import { JwtService } from '@nestjs/jwt';

@Controller('v1/oauth')
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
        ) { }

    @Post('signin')
    async signIn(@Body() dto: SignInDto): Promise<string> {
        return this.usuarioService.RegistrarUsuario(dto.email, dto.contraseña);
    }

    @Post('token')
    async login(@Body() dto: LogInDto) {
        let usuario = await this.usuarioService.ValidarUsuario(dto.email, dto.contraseña);

        if(usuario) {
            const payload = { username: usuario.email, sub: usuario.id };
            return { access_token: this.jwtService.sign(payload), }
        };
    }
}