import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import UsuarioService from "./usuario.service";
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private usuarioService: UsuarioService) {
      super();
    }
  
    async validate(username: string, password: string): Promise<any> {
      const user = await this.usuarioService.ValidarUsuario(username, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
  }