/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Scraper } from '#config/app'
import router from '@adonisjs/core/services/router'

router.get('/scrape', async () => {
  return {"articles": await Scraper.fetchNewPressReleases()}
})
