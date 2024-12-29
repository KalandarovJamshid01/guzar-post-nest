import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryPricingService } from './delivery_pricing.service';
import { CreateDeliveryPricingDto } from './dto/create-delivery_pricing.dto';
import { UpdateDeliveryPricingDto } from './dto/update-delivery_pricing.dto';

@Controller('delivery-pricing')
export class DeliveryPricingController {
  constructor(private readonly deliveryPricingService: DeliveryPricingService) {}

  @Post()
  create(@Body() createDeliveryPricingDto: CreateDeliveryPricingDto) {
    return this.deliveryPricingService.create(createDeliveryPricingDto);
  }

  @Get()
  findAll() {
    return this.deliveryPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryPricingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryPricingDto: UpdateDeliveryPricingDto) {
    return this.deliveryPricingService.update(+id, updateDeliveryPricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryPricingService.remove(+id);
  }
}
