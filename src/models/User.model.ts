import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Tasks from './Task.model';

@Table
class User extends Model {

    @Column({ type: DataType.STRING(100) })
    declare name: string;

    @Column({ type: DataType.STRING(100), unique: true })
    declare email: string;

    @Column({ type: DataType.STRING(100) })
    declare password: string;

    @HasMany(() => Tasks)
    tasks?: Tasks[];

}

export default User;
