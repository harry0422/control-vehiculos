import { Test, TestingModule } from "@nestjs/testing";
import { EstanciaRepository } from "./estancia.repository";
import { EstanciaService } from "./estancia.service";

describe('EstanciaService', () => { 
    let estanciaRepository: jest.Mocked<EstanciaRepository>;
    let service: EstanciaService;

    beforeEach(async () => {
        const estanciaRepositoryMock = {
            persistAndFlush: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: EstanciaRepository, useValue: estanciaRepositoryMock },
                EstanciaService
            ]
        }).compile();

        estanciaRepository = module.get(EstanciaRepository);
        service = module.get<EstanciaService>(EstanciaService);
    });

    it('EstandiaService debe estar definido', () => {
        expect(service).toBeDefined();
    });

    it('registrarEntrada debe retornar id de registro valido', async () => {
        //Arrange
        
        //Act
        
        //Assert
    });

});