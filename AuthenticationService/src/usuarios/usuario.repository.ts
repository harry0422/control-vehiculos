import { Repository, EntityRepository } from "mikro-orm";
import { Usuario } from "./usuario.entity";

@Repository(Usuario)
export class UsuarioRepository extends EntityRepository<Usuario> {
    
    async obtenerPor(email: string): Promise<Usuario | null> {
        return this.findOne({email: email});
    }
}