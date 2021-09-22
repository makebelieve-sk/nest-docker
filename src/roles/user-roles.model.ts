import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Role} from "./roles.model";

@Table({tableName: "user_roles", createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @ApiProperty({example: "1", description: "Роль пользователя"})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false, unique: true})
    roleId: number;

    @ApiProperty({example: "2", description: "Пользователь"})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
}