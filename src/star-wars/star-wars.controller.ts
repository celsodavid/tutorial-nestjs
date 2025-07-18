import {Controller, Get} from "@nestjs/common";
import axios from 'axios';
import {AppConfigService} from "../app-config/app-conig.service";

@Controller('star-wars')
export class StarWarsController {
    private readonly apiBaseUrl: string;
    private readonly protagonistId: number;

    constructor(config: AppConfigService) {
        this.apiBaseUrl = config.starWarsApiBaseUrl;
        this.protagonistId = config.starWarsProtagonistId;
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