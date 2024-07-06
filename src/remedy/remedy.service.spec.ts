import { Test, TestingModule } from '@nestjs/testing';
import { RemedyService } from './remedy.service';

describe('RemedyService', () => {
  let service: RemedyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemedyService],
    }).compile();

    service = module.get<RemedyService>(RemedyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
