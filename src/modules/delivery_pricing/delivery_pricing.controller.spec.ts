import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPricingController } from './delivery_pricing.controller';
import { DeliveryPricingService } from './delivery_pricing.service';

describe('DeliveryPricingController', () => {
  let controller: DeliveryPricingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPricingController],
      providers: [DeliveryPricingService],
    }).compile();

    controller = module.get<DeliveryPricingController>(DeliveryPricingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
