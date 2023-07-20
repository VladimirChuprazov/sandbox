import { Test, TestingModule } from '@nestjs/testing';
import { EncrypterService } from './encrypter.service';

describe('EncrypterService', () => {
  let service: EncrypterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncrypterService],
    }).compile();

    service = module.get<EncrypterService>(EncrypterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
