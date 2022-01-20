import { setup } from '../src/configuration';
import path from 'path';

export default function MollieModule(moduleOptions) {
  // setup and verify confiuguration with options coming from Module Options
  setup(moduleOptions);

  // extension middleware
  this.addServerMiddleware({
    path: '/mollie',
    // handler: extension(moduleOptions),
    handler: path.resolve(__dirname, '../extension/index.js'),
  });

  // notifications (webhook) middleware
  this.addServerMiddleware({
    path: '/mollie/notifications',
    handler: path.resolve(__dirname, '../notification/index.js'),
  });
}
