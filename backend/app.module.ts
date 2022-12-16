import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post.module';
import { MikroOrmModule} from '@mikro-orm/nestjs'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return ({
          debug: true,
          dbName: config.get('database.mongoDbs'),
          entities: ['.backend/entities/**/*.entity.js'],
          entitiesTs: ['backend/entities/**/*.entity.ts'],
          baseDir: process.cwd(),
          type: 'mongo',
          scope: Scope.DEFAULT,
          allowGlobalContext: false,
          clientUrl: config.get('database.mongoUrl'),
          validateRequired: false,
        })
      },
      inject: [ConfigService]
    }),

    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
