import { Test, TestingModule } from '@nestjs/testing';
import { QuartersController } from './quarters.controller';
import { QuartersService } from './quarters.service';

describe('QuartersController', () => {
  let controller: QuartersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuartersController],
      providers: [QuartersService],
    }).compile();

    controller = module.get<QuartersController>(QuartersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
