import ConfigLoader from "./ConfigLoader.js";
import axios from 'axios';

export type ReleaseCapture = {
    //where did the article come from?
    source: string;
    //what is its title?
    title: string;
    //what is the url?
    link: string;
}

class PressReleaseScraper {
    //get the press releases from the urls
    configLoader = new ConfigLoader();

    public async fetchNewPressReleases() {

        //get any newly created configs
        (await this.configLoader.loadConfigs());

        let releases: ReleaseCapture[] = [];
        for (const config of (this.configLoader.getConfigs())) { 

            try {
                const {name, url, regex, base_url} = config;
                const response = axios.get(url);
                const html = (await response).data;

                const matches = [...html.matchAll(new RegExp(regex, 'g'))];

                matches.forEach((match) => {
                    releases.push( {
                        title: match.groups.title, 
                        source: name,
                        link: PressReleaseScraper.parseUrl(match.groups.link, base_url)
                    })
                });

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
    public commitReleases(releases: ReleaseCapture[]) {
        for (const release in releases) {
            //check if it is already present


            //if not, commit


        }
    }
}

export default PressReleaseScraper;