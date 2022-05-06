export enum Environment {
  Development = 'development',
  Integration = 'integration',
  Production = 'production',
}

/**
 * Environment config.
 *
 * @property {string} environment='development' - App environment name.
 */
const environmentConfig = {
  environment: process.env.NEXT_PUBLIC_APP_ENV || Environment.Development,
};

export default environmentConfig;
