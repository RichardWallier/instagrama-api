import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogic } from './auth.logic';

describe('AuthLogic', () => {
  let service: AuthLogic;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLogic],
    }).compile();

    service = module.get<AuthLogic>(AuthLogic);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
