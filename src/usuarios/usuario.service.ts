import { Injectable } from "@nestjs/common";
import { exception } from "console";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";

@Injectable()
export default class UsuarioService {

    constructor(private usuarioRepository: UsuarioRepository) { }

    async RegistrarUsuario(email: string, contraseña: string): Promise<string> {
        let usuario = new Usuario(email, contraseña);
        this.usuarioRepository.persistAndFlush(usuario);

        return usuario.email;
    }

    async ValidarUsuario(email: string, contraseña: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.obtenerPor(email);

        if (!usuario || usuario.contraseña !== contraseña) 
            throw exception('Usuario o contraseña incorrectos');
        
        return usuario;
    }
}