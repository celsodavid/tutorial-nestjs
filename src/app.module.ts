import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { StarWarsModule } from './star-wars/star-wars.module';
import * as Joi from "joi";
import {AppConfig} from "./app-conig";

@Module({
  imports: [
      // This is the configuration module environment variables
      ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
              STAR_WARS_API_BASE_URL: Joi.string().required(),
              STAR_WARS_PROTAGONIST_ID: Joi.number().required(),
          })
      }),

      // This is the TypeORM configuration
      TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              type: 'sqlite',
              database: config.get('DB'),
              // Vai varrer todas as entidades dentro do projeto
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              // Not using synchronize in production is not recommended
              synchronize: true,
          })
      }),
      DevelopersModule,
      StarWarsModule
  ],
  controllers: [AppController],
  providers: [AppConfig, AppService],
  exports: [AppConfig]
})
export class AppModule {}
