import { Test, TestingModule } from '@nestjs/testing';
import { UserExistsValidator } from './user-exists-validator';

describe('UserExistsValidator', () => {
  let provider: UserExistsValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExistsValidator],
    }).compile();

    provider = module.get<UserExistsValidator>(UserExistsValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
