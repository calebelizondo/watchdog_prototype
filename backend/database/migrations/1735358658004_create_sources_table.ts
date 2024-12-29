import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sources'

  async up() {
    this.schema.dropTable(this.tableName)
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name')
      table.string('url')
      table.string('base_url')
      table.string('regex')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}