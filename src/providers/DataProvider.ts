import * as path from 'path'
import * as nedb from 'nedb'

export default abstract class DataProvider {
    static readonly ROOT_DB_STORE = path.normalize(__dirname+'../../db/');

    protected dbStore: nedb
}