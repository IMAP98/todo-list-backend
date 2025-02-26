import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Tasks from './Task.model';

@Table
class User extends Model {

    @Column({ type: DataType.STRING(100) })
    name!: string;

    @Column({ type: DataType.STRING(100) })
    email!: string;

    @Column({ type: DataType.STRING(50) })
    password!: string;

    @HasMany(() => Tasks)
    tasks?: Tasks[];

}

export default User;

