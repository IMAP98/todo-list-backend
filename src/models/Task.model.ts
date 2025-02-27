import { BelongsTo, Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import User from './User.model';

@Table
class Tasks extends Model {

    @Column({ type: DataType.STRING(100) })
    declare name: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare completed: boolean;

    @ForeignKey(() => User)
    declare idUser: number;

    @BelongsTo(() => User)
    declare user: User;

}

export default Tasks;
