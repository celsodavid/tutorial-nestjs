import {forwardRef, Module} from '@nestjs/common';
import {StarWarsController} from "./star-wars.controller";
import {AppModule} from "../app.module";

@Module({
    imports: [forwardRef(() => AppModule)],
    controllers: [StarWarsController],
})
export class StarWarsModule {}
