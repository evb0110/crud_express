const db = require('../util/database')
const table = 'test'

module.exports = class Item {
  constructor(name, price, id) {
    this.name = name
    this.price = price
    this.id = id
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM ${table}`).then(r => r[0])
  }

  save() {
    if (this.id) {
      return db.execute(`UPDATE ${table} SET name = ?, price = ? WHERE ${table}.id = ?`, [this.name, this.price, this.id])
    } else {
      return db.execute(`INSERT INTO ${table} (name, price) VALUES (?, ?)`, [this.name, this.price])
    }
  }

  static fetchById(id) {
    return db.execute(`SELECT * FROM ${table} WHERE ${table}.id = ?`, [id]).then(r => r[0][0])
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM ${table} WHERE id = ?`, [id])
  }

}