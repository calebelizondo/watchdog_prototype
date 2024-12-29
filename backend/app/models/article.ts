import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Source from './source.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare source_id: number  

  @belongsTo(() => Source)
  declare source: relations.BelongsTo<typeof Source>

}