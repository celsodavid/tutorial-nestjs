import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      // This is the TypeORM configuration
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        // Vai varrer todas as entidades dentro do projeto
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // Not using synchronize in production is not recommended
        synchronize: true,
      }),
      DevelopersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
