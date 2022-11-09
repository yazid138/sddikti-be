import { Test, TestingModule } from '@nestjs/testing';
import { QueryNameExistsValidator } from './query-name-exists-validator';

describe('QueryNameExistsValidator', () => {
  let provider: QueryNameExistsValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryNameExistsValidator],
    }).compile();

    provider = module.get<QueryNameExistsValidator>(QueryNameExistsValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
