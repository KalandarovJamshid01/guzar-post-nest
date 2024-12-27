import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryPricingDto } from './create-delivery_pricing.dto';

export class UpdateDeliveryPricingDto extends PartialType(CreateDeliveryPricingDto) {}
