import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      // This is the configuration module environment variables
      ConfigModule.forRoot({ isGlobal: true }),

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
      DevelopersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
