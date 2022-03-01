const defaultConfig = {
  propellerKey: null,
  propellerApiUrl: 'https://api.helice.cloud/graphql',
  mollieKey: null,
  mollieIsTest: true,
  mollieRedirectUrl: '/checkout/thank-you',
  mollieWebhookUrl: '',
};

const config = {
  ...defaultConfig,
};

interface Configuration {
  propellerKey: string;
  propellerApiUrl: string;
  mollieKey: string;
  mollieIsTest: boolean;
  mollieRedirectUrl: string;
  mollieWebhookUrl: string;
}

const setup = ({
  propellerKey,
  propellerApiUrl,
  mollieKey,
  mollieIsTest,
  mollieRedirectUrl,
  mollieWebhookUrl,
}: Configuration) => {
  if (!propellerKey) {
    console.error(
      '[Propeller-Mollie] Bad config provided, Propeller Key is missing'
    );
    return;
  }

  if (!mollieKey) {
    console.error(
      '[Propeller-Mollie] Bad config provided, Mollie Key is missing'
    );
    return;
  }

  config.propellerKey = propellerKey;
  config.mollieKey = mollieKey;
  config.mollieRedirectUrl = mollieRedirectUrl;
  config.mollieWebhookUrl = mollieWebhookUrl;

  if (propellerApiUrl) config.propellerApiUrl = propellerApiUrl;
  if (mollieIsTest) config.mollieIsTest = mollieIsTest;
};

const getPropellerKey = () => config.propellerKey;
const getPropellerApiUrl = () => config.propellerApiUrl;
const getMollieKey = () => config.mollieKey;
const getMollieIsTest = () => config.mollieIsTest;
const getMollieRedirectUrl = () => config.mollieRedirectUrl;
const getMollieWebhookUrl = () => config.mollieWebhookUrl;
const getExtensionProxyUrl = () => `${window.location.origin}/mollie`;
const getNotificationProxyUrl = () => '/mollie/notifications';

export {
  defaultConfig,
  setup,
  Configuration,
  getPropellerApiUrl,
  getPropellerKey,
  getMollieKey,
  getMollieIsTest,
  getMollieRedirectUrl,
  getMollieWebhookUrl,
  getExtensionProxyUrl,
  getNotificationProxyUrl,
};
