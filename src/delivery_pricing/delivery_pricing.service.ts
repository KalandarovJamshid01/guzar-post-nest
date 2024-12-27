import { Injectable } from '@nestjs/common';
import { CreateDeliveryPricingDto } from './dto/create-delivery_pricing.dto';
import { UpdateDeliveryPricingDto } from './dto/update-delivery_pricing.dto';

@Injectable()
export class DeliveryPricingService {
  create(createDeliveryPricingDto: CreateDeliveryPricingDto) {
    return 'This action adds a new deliveryPricing';
  }

  findAll() {
    return `This action returns all deliveryPricing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryPricing`;
  }

  update(id: number, updateDeliveryPricingDto: UpdateDeliveryPricingDto) {
    return `This action updates a #${id} deliveryPricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryPricing`;
  }
}
