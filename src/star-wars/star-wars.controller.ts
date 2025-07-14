import {Controller, Get} from "@nestjs/common";
import axios from 'axios';
import {ConfigService} from "@nestjs/config";

@Controller('star-wars')
export class StarWarsController {
    private readonly apiBaseUrl: string;
    private readonly protagonistId: number;

    constructor(config: ConfigService) {
        this.apiBaseUrl = config.get<string>('STAR_WARS_API_BASE_URL', '');
        this.protagonistId = config.get<number>('STAR_WARS_PROTAGONIST_ID', 0);
    }

    @Get('characters')
    getCharacters() {
        return axios
            .get(`${this.apiBaseUrl}/people`)
            .then(response => response.data)
            .catch(error => console.error(error));
    }

    @Get('protagonist')
    getProtagonist() {
        return axios
            .get(`${this.apiBaseUrl}/people/${this.protagonistId}`)
            .then(response => response.data)
    }
}