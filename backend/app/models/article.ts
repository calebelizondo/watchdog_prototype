import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Source from './source.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare url: string 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare title: string

  @column()
  declare source_name: string 

  @belongsTo(() => Source, {
    foreignKey: 'source_name', 
    localKey: 'name', 
  })
  declare source: relations.BelongsTo<typeof Source>
}
