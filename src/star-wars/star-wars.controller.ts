import {Controller, Get} from "@nestjs/common";
import axios from 'axios';
import {ConfigService} from "@nestjs/config";

@Controller('star-wars')
export class StarWarsController {
    private readonly apiBaseUrl: string;

    constructor(config: ConfigService) {
        this.apiBaseUrl = config.get<string>('STAR_WARS_API_BASE_URL', '');
    }

    @Get('characters')
    getCharacters() {
        return axios
            .get(`${this.apiBaseUrl}/people`)
            .then(response => response.data)
            .catch(error => console.error(error));
    }
}