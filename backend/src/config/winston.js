import winston from 'winston';
import config from './app';

const { createLogger, format, transports } = winston;
const { ENV, APP_ROOT } = config;

// define custom settings for each transport (file, console)
const options = {
  file: {
    level: ENV === 'development' ? 'debug' : 'info',
    filename: `${APP_ROOT}/backend/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: ENV === 'development' ? 'debug' : 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
  },
};

// your centralized logger object
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new (transports.Console)(options.console),
    new (transports.File)(options.file),
  ],
});

export default logger;
