import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppConfig {
    constructor(private readonly configService: ConfigService) {}

    get starWarsApiBaseUrl(): string {
        return this.configService.get<string>('STAR_WARS_API_BASE_URL', '');
    }

    get starWarsProtagonistId(): number {
        return this.configService.get<number>('STAR_WARS_PROTAGONIST_ID', 0);
    }
}