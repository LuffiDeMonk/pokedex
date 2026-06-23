import * as Sentry from '@sentry/react';

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    console.info(message, context);
    Sentry.addBreadcrumb({
      category: 'info',
      message,
      level: 'info',
      data: context,
    });
    // Explicitly send to Sentry so it shows up in the dashboard
    Sentry.captureMessage(message, { level: 'info', extra: context });
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(message, context);
    Sentry.addBreadcrumb({
      category: 'warning',
      message,
      level: 'warning',
      data: context,
    });
    // Explicitly send to Sentry so it shows up in the dashboard
    Sentry.captureMessage(message, { level: 'warning', extra: context });
  },
  error: (error: Error | string, context?: Record<string, unknown>) => {
    console.error(error, context);
    if (typeof error === 'string') {
      Sentry.captureMessage(error, { level: 'error', extra: context });
    } else {
      Sentry.captureException(error, { extra: context });
    }
  },
};
