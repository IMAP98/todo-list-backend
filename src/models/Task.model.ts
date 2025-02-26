import { BelongsTo, Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import User from './User.model';

@Table
class Tasks extends Model {

    @Column({ type: DataType.STRING(100) })
    name!: string;

    @ForeignKey(() => User)
    idUser?: number;

    @BelongsTo(() => User)
    user?: User;

}

export default Tasks;