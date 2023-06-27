import * as SQLite from 'expo-sqlite'

//Cria o Database no SQLITE
const db = SQLite.openDatabase("db.db")

export default db