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

router.get('/', async () => {
  return {
    "configs": WebConfigs
  }
})
