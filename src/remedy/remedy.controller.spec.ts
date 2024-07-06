import { Test, TestingModule } from '@nestjs/testing';
import { RemedyController } from './remedy.controller';

describe('RemedyController', () => {
  let controller: RemedyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemedyController],
    }).compile();

    controller = module.get<RemedyController>(RemedyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
