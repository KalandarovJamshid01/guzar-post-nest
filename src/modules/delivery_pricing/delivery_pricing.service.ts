import { Injectable } from '@nestjs/common';
import { CreateDeliveryPricingDto } from './dto/create-delivery_pricing.dto';
import { UpdateDeliveryPricingDto } from './dto/update-delivery_pricing.dto';

@Injectable()
export class DeliveryPricingService {
  create(createDeliveryPricingDto: CreateDeliveryPricingDto) {
  }

  findAll() {
  }

  findOne(id: number) {
  }

  update(id: number, updateDeliveryPricingDto: UpdateDeliveryPricingDto) {
  }

  remove(id: number) {
  }
}
