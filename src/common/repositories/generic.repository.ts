import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

@Injectable()
export class GenericRepository<T extends AbstractEntity<T>> {
  private readonly logger = new Logger(GenericRepository.name);
  constructor(private readonly repo: Repository<T>) {}

  async create(data: any | any[]): Promise<T | { data: T[]; count: number }> {
    try {
      const newEntity = await this.repo.create(data);
      this.logger.log(newEntity);
      const entity = await this.repo.save(newEntity);
      return Array.isArray(entity)
        ? { data: entity, count: data.length }
        : entity;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(options): Promise<{ data: T[]; count: number }> {
    try {
      const [data, count] = await this.repo.findAndCount(options);
      return { data, count };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`error.message`);
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const entity = await this.repo.findOneBy({ id } as FindOptionsWhere<T>);
      if (!entity) {
        throw new NotFoundException(`Entity with id ${id} not found`);
      }
      return entity;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, data: any): Promise<T | null> {
    try {
      const entity = await this.findById(id);
      Object.assign(entity, data);
      return this.repo.save(entity);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
  async remove(id: number) {
    try {
      await this.findById(id);
      await this.repo.delete({ id } as FindOptionsWhere<T>);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
