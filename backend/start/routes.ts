/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { WebConfigs } from '#config/app'
import router from '@adonisjs/core/services/router'
import PressReleaseScraper from '../app/utils/PressReleaseScraper.js';

const scraper = new PressReleaseScraper();

router.get('/', async () => {
  return {
    "configs": WebConfigs
  }
});

router.get('/scrape', async () => {
  return {"articles": await scraper.fetchNewPressReleases()}
})
