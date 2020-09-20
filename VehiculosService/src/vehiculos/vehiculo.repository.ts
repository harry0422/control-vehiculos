import { EntityRepository, Repository } from "mikro-orm";
import { Vehiculo } from "./vehiculo.entity";

@Repository(Vehiculo)
export class VehiculoRepository extends EntityRepository<Vehiculo> {
    async obtenerPor(placa: string): Promise<Vehiculo | null> {
        return this.findOne({ placa: placa})
    }
}