import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'sources'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('regex').alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('regex', 255).alter()  // Revert to a VARCHAR(255) column if rolling back
    })
  }
}