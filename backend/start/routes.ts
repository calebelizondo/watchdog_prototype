/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Source from '#models/source'
import PressReleaseScraper from '../app/utils/PressReleaseScraper.js';


router.post('/scrape', async (ctx: any) => {
  // extract the source details from the request body
  const { url, regex } = ctx.request.only(['url', 'regex'])

  // create and save the new source
  const results = await PressReleaseScraper.scrape(url, regex);

  // return the created source in the response
  return ctx.response.status(201).json({
    results: results,
  })
});


router.post('/post_source', async (ctx: any) => {
  // extract the source details from the request body
  const { name, url, base_url, regex } = ctx.request.only(['name', 'url', 'base_url', 'regex'])

  // create and save the new source
  const source = await Source.create({
    name,
    url,
    base_url,
    regex
  })

  // return the created source in the response
  return ctx.response.status(201).json({
    message: 'Source created successfully!',
    source
  })
});

router.get('/get_source_names', async (ctx: any) => {

  return ctx.response.status(201).json({
    results: (await Source.all()).map((source: Source) => {return source.name})
  });

});

router.post('/get_source', async (ctx: any) => {

  const { name } = ctx.request.only(['name']);

  console.log("name", name);

  return ctx.response.status(201).json({
    results: (await Source.findBy({name}))
  });

});