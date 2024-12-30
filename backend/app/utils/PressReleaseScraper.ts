import Article from "#models/article";
import Source from "#models/source";
import axios from 'axios';

export type ReleaseCapture = {
    //where did the article come from?
    source_name: string;
    //what is its title?
    title: string;
    //what is the url?
    url: string;
}

class PressReleaseScraper {

    public async fetchNewPressReleases() {

        let releases: ReleaseCapture[] = [];
        for (const config of (await Source.all())) { 

            try {
                const {name, url, regex, base_url} = config;

                (await PressReleaseScraper.scrape(url, regex)).forEach((match: {title: string, link: string}) => 
                    {
                        releases.push({
                            title: match.title,
                            url: PressReleaseScraper.parseUrl(match.link, base_url),
                            source_name: name
                        })
                    }
                );

            } catch {


                //TODO: log failure 

                continue;
            }
        }

        return releases;
    };

    //replace relative link with absolute if needed
    private static parseUrl(url: string, base_url: string) {
        return url.startsWith("http") ? url : base_url + url;
    }


    //commit release objects to the database
    public static commitReleases(releases: ReleaseCapture[]) {
        for (const release of releases) {
            try {
                Article.firstOrCreate({url: release.url}, {...release});
            } catch (error) {
                console.log(`failed to create article ${release}`);
                console.log(error);
                continue;
            }
        }
    }

    public static async scrape(url: string, regex: string) {

        let response;

        try {
            response = axios.get(url);
        } catch {
            //TODO: log error
            return [];
        }
        
        
        const html = (await response).data;
        const matches = [...html.matchAll(new RegExp(regex, 'g'))];

        return matches.map((match) => {
            return ( {
                title: match.groups.title, 
                link: PressReleaseScraper.parseUrl(match.groups.link, '')
            })
        });
    }
}

export default PressReleaseScraper;