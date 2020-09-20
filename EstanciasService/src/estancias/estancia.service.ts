import { Injectable } from '@nestjs/common';
import { exception } from 'console';
import { Estancia } from './estancia.entity';
import { EstanciaRepository } from './estancia.repository';

@Injectable()
export class EstanciaService {
    
    constructor(private estanciaRepository: EstanciaRepository) { }

    async registrarEntrada(vehiculo: string): Promise<string> {
        //this.lanzarExcepcionSiVehiculoTieneEstanciaActiva(vehiculo);
        let estancia = new Estancia(vehiculo);
        this.estanciaRepository.persistAndFlush(estancia);
        //estancia = await this.obtenerEstanciaCreadaOLanzarExcepcion(vehiculo);
        
        return estancia.id;
    }

    async registrarSalida(vehiculo: string): Promise<string> {
        let estancia = await this.ObtenerEstanciaActivaOLanzarExcepcion(vehiculo);
        estancia.cerrar();
        this.estanciaRepository.persistAndFlush(estancia);

        return estancia.id;
    }

    private async lanzarExcepcionSiVehiculoTieneEstanciaActiva(vehiculo: string): Promise<void> {
        let estancia = await this.obtenerEstanciaActivaPara(vehiculo);
        
        if (estancia !== null) 
            throw exception('El vehiculo ya tiene una estancia activa.');
    }

    private async obtenerEstanciaCreadaOLanzarExcepcion(vehiculo: string): Promise<Estancia> {
        const estancia = await this.obtenerEstanciaActivaPara(vehiculo);

        if (estancia === null)
            throw exception('Estancia no se encuentra registrada.');

        return estancia;
    }

    private async ObtenerEstanciaActivaOLanzarExcepcion(vehiculo: string) {
        let estancia = await this.obtenerEstanciaActivaPara(vehiculo);

        if(estancia === null) 
            throw exception('El vehiculo no tiene estancias activas.');

        return estancia;
    }

    private async obtenerEstanciaActivaPara(vehiculo: string): Promise<Estancia | null> {
        return await this.estanciaRepository.obtenerPor(vehiculo, Estancia.ESTADO_ACTIVO);
    }
}