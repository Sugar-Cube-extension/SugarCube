
//idk bee neededdd
type LogLevel = 'info' | 'warn' | 'error';

export const logger = {
  log: (level: LogLevel, ...args: any[]) => {
    console[level](`[SugarCube] [${level.toUpperCase()}]`, ...args);
  },
  info: (...args: any[]) => logger.log('info', ...args),
  warn: (...args: any[]) => logger.log('warn', ...args),
  error: (...args: any[]) => logger.log('error', ...args),
};
