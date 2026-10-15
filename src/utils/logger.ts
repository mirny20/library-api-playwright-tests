export class Logger {
  private readonly levels: string[];
  private readonly currentLevel: string;

  constructor() {
    this.levels = ['debug', 'info', 'warning', 'error'];
    this.currentLevel = process.env.LOG_LEVEL || 'warning';
  }

  private shouldLog(level: string): Boolean {
    return this.levels.indexOf(level) >= this.levels.indexOf(this.currentLevel);
  }

  private log(level: string, message: string, ...args: unknown[]) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`, ...args);
    }
  }

  debug(message: string, ...args: unknown[]) { this.log('debug', message, ...args); }

  info(message: string, ...args: unknown[]) { this.log('info', message, ...args); }

  warning(message: string, ...args: unknown[]) { this.log('warning', message, ...args); }

  error(message: string, ...args: unknown[]) { this.log('error', message, ...args); }
}