import { TasksModule } from "./tasks/tasks.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config'
import { configValidationSchema } from "./config.schema";
import { ExcelModule } from './excel/excel.module';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.development.env`,
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,ScheduleModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
          return {
                    type: 'mysql',
                    autoLoadEntities: true,
                    synchronize: true,
                    host: configService.get('DB_HOST'),
                    port: parseInt(configService.get('DB_PORT')),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                  }}
    }),
    TasksModule,
    AuthModule,
    ExcelModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
