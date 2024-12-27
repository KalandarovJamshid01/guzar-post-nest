import { Module } from '@nestjs/common';
import { DeliveryPricingService } from './delivery_pricing.service';
import { DeliveryPricingController } from './delivery_pricing.controller';

@Module({
  controllers: [DeliveryPricingController],
  providers: [DeliveryPricingService],
})
export class DeliveryPricingModule {}
