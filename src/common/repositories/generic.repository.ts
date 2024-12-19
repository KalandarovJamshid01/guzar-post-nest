import { Injectable } from '@nestjs/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

@Injectable()
export class GenericRepository<T extends AbstractEntity<T>> {
  constructor(
    private readonly repo: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async create(data: T | T[]): Promise<T | T[]> {
    if (Array.isArray(data)) {
      const newEntites = this.repo.create(data);
      return this.repo.save(newEntites);
    }
    const newEntity = this.repo.create(data); // Yangi entity yaratish
    return this.repo.save(newEntity);
  }

  async update(id: number, data: any): Promise<T | null> {
    await this.repo.update(id, data);
    return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
  }
  async remove(id: number) {
    await this.repo.delete({ id } as FindOptionsWhere<T>);
  }
}
