import { EntityRepository, Repository } from "mikro-orm";
import { Estancia } from "./estancia.entity";

@Repository(Estancia)
export class EstanciaRepository extends EntityRepository<Estancia> {
        
    async obtenerPor(vehiculo: string, estado: string): Promise<Estancia | null> {
        return await this.findOne({ vehiculo: vehiculo, estado: estado });
    }
}