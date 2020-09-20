import { Controller, Post, Body } from '@nestjs/common';
import { PlacaDto } from './placa.dto';
import { EstanciaService } from './estancia.service';

@Controller('v1/estancias')
export class EstanciaController {

    constructor(private estanciaSercice: EstanciaService) { }

    @Post('entradas')
    async registrarEntrada(@Body() placaDto: PlacaDto): Promise<string> {
        let id = this.estanciaSercice.registrarEntrada(placaDto.numeroPlaca);

        return id;
    }

    @Post('salidas')
    async registrarSalida(@Body() placaDto: PlacaDto): Promise<string> {
        let id = this.estanciaSercice.registrarSalida(placaDto.numeroPlaca);

        return id;
    }
}