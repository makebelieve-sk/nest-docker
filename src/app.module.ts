import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRole} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

@Module({
    controllers: [],
    providers: [],
    imports:  [
        ServeStaticModule.forRoot({
            rootPath: path.join(__dirname, "static"),
        }),
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: "localhost"/*process.env.POSTGRES_HOST====для docker необходимо указать postgres*/,
            port: 5432/*Number(process.env.POSTGRES_PORT)*/,
            username: "postgres"/*process.env.POSTGRES_USER*/,
            password: "228228"/*process.env.POSTGRES_PASSWORD*/,
            database: "nest-docker"/*process.env.POSTGRES_DB*/,
            models: [User, Role, UserRole, Post],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {

}