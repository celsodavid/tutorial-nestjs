import {Module} from '@nestjs/common';
import {StarWarsController} from "./star-wars.controller";
import {AppConfigModule} from "../app-config/app-config.module";

@Module({
    imports: [AppConfigModule],
    controllers: [StarWarsController],
})
export class StarWarsModule {}
