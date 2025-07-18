import { Module } from '@nestjs/common';
import {AppConfigService} from "./app-conig.service";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";

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
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
