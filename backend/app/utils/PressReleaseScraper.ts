import { WebConfigs } from "#config/app";
import axios from 'axios';

class PressReleaseScraper {

    async fetchNewPressReleases() {


        for (const config of WebConfigs) { 
            
            const {name, url, regex} = config;
            const response = axios.get(url);
            const html = (await response).data;

            
            const matches = [...html.matchAll(new RegExp(regex, 'g'))];

            for (const match of matches) {
                console.log(match.groups.title, match.groups.link);
            }

            return matches.map((match) => {return {...match.groups}});
        }
    }
}

export default PressReleaseScraper;