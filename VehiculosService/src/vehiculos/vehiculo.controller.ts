import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehiculoOficialDto } from './vehiculo-oficial.dto';
import { VehiculoResidenteDto } from './vehiculo-residente.dto';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoService } from './vehiculo.service';

@Controller('v1/vehiculos')
export class VehiculoController {

    constructor(private vehiculoService: VehiculoService) { }

    @Get(':placa')
    async obtenerVehiculoOficial(@Param('placa') placa: string): Promise<Vehiculo | null> {
        return this.vehiculoService.obtenerVehiculo(placa);
    }
    
    @Post('oficiales')
    async darAltaVehiculoOficial(@Body() vehiculoOficialDto: VehiculoOficialDto): Promise<string> {
        return this.vehiculoService.darAltaVehiculoOficial(vehiculoOficialDto.placa);
    }

    @Post('residentes')
    async darAltaVehiculoResidente(@Body() vehiculoResidenteDto: VehiculoResidenteDto): Promise<string> {
        return this.vehiculoService.darAltaVehiculoResidente(vehiculoResidenteDto.placa);
    }
}