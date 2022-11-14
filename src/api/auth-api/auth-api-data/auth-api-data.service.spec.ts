import { Test, TestingModule } from '@nestjs/testing';
import { AuthApiDataService } from './auth-api-data.service';

describe('AuthApiDataService', () => {
  let service: AuthApiDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthApiDataService],
    }).compile();

    service = module.get<AuthApiDataService>(AuthApiDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
