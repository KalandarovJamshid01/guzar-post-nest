import { Test, TestingModule } from '@nestjs/testing';
import { QuartersService } from './quarters.service';

describe('QuartersService', () => {
  let service: QuartersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuartersService],
    }).compile();

    service = module.get<QuartersService>(QuartersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
