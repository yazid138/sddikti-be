import { Test, TestingModule } from '@nestjs/testing';
import { ApiNameExists } from './api-name-exists';

describe('ApiNameExists', () => {
  let provider: ApiNameExists;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiNameExists],
    }).compile();

    provider = module.get<ApiNameExists>(ApiNameExists);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
