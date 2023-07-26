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

  it('should hash a string', async () => {
    const str = 'test';
    const hashedStr = await service.hash(str);
    expect(hashedStr).toBeDefined();
    expect(hashedStr).not.toEqual(str);
  });

  it('should compare a string with a hashed string', async () => {
    const str = 'test';
    const { hashedStr, salt } = await service.hash(str);
    const result = await service.compare(str, hashedStr, salt);
    expect(result).toBe(true);
  });

  it('should compare a string with a hashed string and return false', async () => {
    const str = 'test';
    const { hashedStr, salt } = await service.hash(str);
    const result = await service.compare('test2', hashedStr, salt);
    expect(result).toBe(false);
  });
});
