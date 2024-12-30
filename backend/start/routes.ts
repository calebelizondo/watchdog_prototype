/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import Source from '#models/source';
import Article from "#models/article";
import PressReleaseScraper from '../app/utils/PressReleaseScraper.js';
import { Scraper } from '#config/app';


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

router.get('/get_source', async ({ request, response }) => {
  const name = request.qs().name;

  if (!name) {
    return response.status(400).json({ error: "Name parameter is required" });
  }
  
  const source = await Source.findBy({ name });

  if (!source) {
    return response.status(404).json({ error: "Source not found" });
  }

  return response.status(200).json({
    results: source,
  });
});

//mostly for testing purposes, scrapes every source to update articles
router.get('/update_articles', async ({request, response}) => {
  PressReleaseScraper.commitReleases(await Scraper.fetchNewPressReleases());

  return response.status(200).json({
    message: "successful",
  });
});

router.get('/latest_articles', async ({request, response}) => {

  //filter by sources (can be undefined)
  const sources: string[] | undefined = request.qs().sources;
  //number of articles we want
  const n: number | undefined = request.qs().n;
  //how many have we already seen?
  const offset: number | undefined = request.qs().offset;

  if (!n) {
    return response.status(400).json({ error: "number of articles (n) required" });
  }

  if (!offset) {
    return response.status(400).json({ error: "offset required" });
  }

  const source_ids = sources ? await Source.query()
    .whereIn('name', sources)
    .select('id') 
    .exec() : undefined; 

  //don't filter by sources

  /*
  const latest_articles: Article[] = 
    sources ? await Article.query().whereIn('source_id', source_ids).orderBy('created_at', 'desc').offset(offset).limit(n) : 
      await Article.query().orderBy('created_at', 'desc').offset(offset).limit(n);
  */
  return response.status(200).json({
    articles: "successful",
  });



});