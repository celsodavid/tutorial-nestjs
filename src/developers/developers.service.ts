import {Inject, Injectable} from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import {Repository} from "typeorm";
import {Developer} from "./entities/developer.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class DevelopersService {
  // Injectable: Dependency Injection
  constructor(
      @InjectRepository(Developer) // InjectRepository: Injeta o repositório do TypeORM para a entidade Developer pois javascript não possui tipagem
      private readonly repository: Repository<Developer>
  ) {}

  create(dto: CreateDeveloperDto) {
    const developer = this.repository.create(dto);
    return this.repository.save(developer);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  // indica que o metodo executa operações assíncronas e permite esperar por operações sem bloquear a execução do codigo
  async update(id: string, dto: UpdateDeveloperDto) {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) return null;

    this.repository.merge(developer, dto);
    return this.repository.save(developer);
  }

  async remove(id: string) {
    const developer = await this.repository.findOneBy({ id });
    if (!developer) return null;

    return this.repository.remove(developer);
  }
}
