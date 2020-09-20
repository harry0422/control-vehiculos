import { Injectable } from "@nestjs/common";
import { Console, exception } from "console";
import { Vehiculo } from "./vehiculo.entity";
import { VehiculoRepository } from "./vehiculo.repository";

@Injectable()
export class VehiculoService {

    constructor(private vehiculoRepository: VehiculoRepository) { }
    
    async darAltaVehiculoOficial(placa: string): Promise<string> {
        //this.lanzarExcepcionSiVehiculoExiste(placa);
        let vehiculo = Vehiculo.crearOficial(placa);
        this.vehiculoRepository.persistAndFlush(vehiculo);
        //vehiculo = await this.validarSiVehiculoSeGuardo(placa);

        return vehiculo.id;
    }

    async darAltaVehiculoResidente(placa: string): Promise<string> {
        //this.lanzarExcepcionSiVehiculoExiste(placa);
        let vehiculo = Vehiculo.crearResidente(placa);
        this.vehiculoRepository.persistAndFlush(vehiculo);
        //vehiculo = await this.validarSiVehiculoSeGuardo(placa);

        return vehiculo.id;
    }

    async obtenerVehiculo(placa: string): Promise<Vehiculo | null> {
        return this.vehiculoRepository.obtenerPor(placa);
    }

    private async lanzarExcepcionSiVehiculoExiste(placa: string) {
        let vehiculo = await this.vehiculoRepository.obtenerPor(placa);
        
        if (vehiculo !== undefined)
            throw exception('Vehiculo ya se encuentra ingresado.');
    }

    private async validarSiVehiculoSeGuardo(placa: string): Promise<Vehiculo> {
        let vehiculo = await this.vehiculoRepository.obtenerPor(placa);

        if (vehiculo === null)
            throw exception('Error al intentar guardar el vehiculo.');

        return vehiculo;
    }
}