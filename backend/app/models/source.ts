import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Article from './article.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Source extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare base_url: string

  @column()
  declare regex: string

  @hasMany(() => Article)
  declare articles: relations.HasMany<typeof Article>
}