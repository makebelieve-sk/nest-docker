import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: "posts"})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({example: "Привет, я заголовок!", description: "Заголовок поста"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    title: string;

    @ApiProperty({example: "Содержание поста", description: "Содержание"})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: "Картинка", description: "Картинка поста"})
    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}