import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthDataNameExists } from './api-auth-data-name-exists';

describe('ApiAuthDataNameExists', () => {
  let provider: ApiAuthDataNameExists;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiAuthDataNameExists],
    }).compile();

    provider = module.get<ApiAuthDataNameExists>(ApiAuthDataNameExists);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
