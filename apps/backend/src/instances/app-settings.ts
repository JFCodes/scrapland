import { DBSchema_AppSettings, DEFAULT_APP_SETTINGS, T_AppSettings } from '@scrapland/data-model'
import { T_MergeAppSettings } from '@scrapland/functions'
import { parseArgs } from 'node:util'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
// App
import { db } from '../database'

// We don't want command overwrites to be saved on the DB, so:
// to update settings from frontend (or a source that is meant to be persisted)
// never save this.settings. Instead, patch the DB entry with the value to change
// and then patch this.settings in memory.

// On startup, persistent changes are loaded from the DB and merged with command settings.
class AppSettingsClass {
  settings: T_AppSettings = DEFAULT_APP_SETTINGS

  async initialize (): Promise<void> {
    await this.ensureDbEntry()
    this.loadData()
    this.parseCommandOptions()
    this.generateRunTimeFile()
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

  private parseCommandOptions (): void {
    const { values } = parseArgs({ options: {
      port: { type: 'string' },
      disableScheduler: { type: 'boolean' }
    }, strict: true,})
    
    const port = this.getIntegerVariable(values.port, { min: 1, max: 65535 })
    if (port) this.settings.BACKEND_SERVER_PORT = port

    if (values.disableScheduler) this.settings.BACKEND_SERVER_BLOCK_ACTIVE_SCHEDULER = true
  }

  private loadData (): void {
    // This row must be define after this.ensureDbEntry
    const row = db.select().from(DBSchema_AppSettings).get()
    if (!row) throw new Error('Undefined app settings overwrites during initialization')

    this.settings = T_MergeAppSettings(row.overrides)
  }

  private getIntegerVariable (value: undefined | string, opts?: { max: number, min: number }): null | number {
    if (value === undefined) return null

    const valueNumber = Number(value)
    if (isNaN(valueNumber)) return null
    if (!isFinite(valueNumber)) return null
    if (!Number.isInteger(valueNumber)) return null
    if (opts && valueNumber < opts.min) return null
    if (opts && valueNumber > opts.max) return null

    return valueNumber
  }

  private generateRunTimeFile (): void {
    if (!existsSync('../_runtime')) mkdirSync('../_runtime')

    const dataString = JSON.stringify(this.settings, null, 2)
    writeFileSync('../_runtime/settings.json', dataString)
  }
}

export const AppSettings = new AppSettingsClass()
