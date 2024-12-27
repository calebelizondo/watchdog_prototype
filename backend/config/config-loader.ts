import fs from 'fs/promises';
import path from 'path';
import { SiteConfig } from '../types.js';

class ConfigLoader {
  private config: SiteConfig[] = [];

  async loadConfig(): Promise<void> {
    try {
      // Get the directory path just outside the application's directory
      const configDirectory = "../configs";

      // Read all files in the directory
      const files = await fs.readdir(configDirectory);
      const jsonFiles = files.filter((file) => file.endsWith('.json'));

      // Load and parse each file
      const configs = await Promise.all(
        jsonFiles.map(async (file) => {
          const filePath = path.join(configDirectory, file);
          const data = await fs.readFile(filePath, 'utf-8');
          return JSON.parse(data) as SiteConfig;
        })
      );

      this.config = configs;
    } catch (error) {
      console.error('Error loading site configurations:', error);
      throw error;
    }
  }

  getConfigs(): SiteConfig[] {
    return this.config;
  }
}

export default new ConfigLoader();
