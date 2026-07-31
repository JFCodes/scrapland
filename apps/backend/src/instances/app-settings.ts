import { DBSchema_AppSettings, DEFAULT_APP_SETTINGS, T_AppSettings } from '@scrapland/data-model'
import { T_MergeAppSettings } from '@scrapland/functions'
// App
import { db } from '../database'

class AppSettingsClass {
  settings: T_AppSettings = DEFAULT_APP_SETTINGS

  async initialize (): Promise<void> {
    await this.ensureDbEntry()
    this.loadData()
  }

  private async ensureDbEntry (): Promise<void> {
    const row = db.select().from(DBSchema_AppSettings).get()
    if (!row) {
      await db.insert(DBSchema_AppSettings).values({
        _createdAt: new Date().getTime(),
        overrides: {}
      })
    }
  }

  private loadData (): void {
    // This row must be define after this.ensureDbEntry
    const row = db.select().from(DBSchema_AppSettings).get()
    if (!row) throw new Error('Undefined app settings overwrites during initialization')

    this.settings = T_MergeAppSettings(row.overrides)
  }
}

export const AppSettings = new AppSettingsClass()
