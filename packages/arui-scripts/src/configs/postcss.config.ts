import config from './app-configs';


/**
 * Функция для создания конфигурационного файла postcss
 * @param {String[]} plugins список плагинов
 * @param {Object} options коллекция конфигураций плагинов, где ключ - название плагина, а значение - аргумент для инициализации
 * @returns {*}
 */
export function createPostcssConfig(plugins: string[], options: Record<string, unknown>) {
    return plugins.map(pluginName => {
        const plugin = require(pluginName);

        if (options.hasOwnProperty(pluginName)) {
            return plugin(options[pluginName]);
        }
        return plugin();
    });
}

export const postcssPlugins = [
    'postcss-omit-import-tilde',
    'postcss-import',
    'postcss-url',
    'postcss-mixins',
    'postcss-for',
    'postcss-each',
    'postcss-custom-media',
    config.keepCssVars === false && 'postcss-custom-properties',
    'postcss-strip-units',
    'postcss-calc',
    'postcss-color-function',
    'postcss-color-mod-function',
    'postcss-nested',
    'autoprefixer',
    'postcss-inherit',
].filter(Boolean) as string[];

export const postcssPluginsOptions = {
    'postcss-import': {
        path: ['./src'],
        plugins: [require('postcss-discard-comments')()],
    },
    'postcss-url': {
        url: 'rebase',
    },
    'postcss-custom-media': {
        extensions: {
            '--small': 'screen',
            '--small-only': 'screen and (max-width: 47.9375em)',
            '--medium': 'screen and (min-width: 48em)',
            '--medium-only': 'screen and (min-width: 48em) and (max-width: 63.9375em)',
            '--large': 'screen and (min-width: 64em)',
            '--large-only': 'screen and (min-width: 64em) and (max-width: 89.9375em)',
            '--xlarge': 'screen and (min-width: 90em)',
            '--xlarge-only': 'screen and (min-width: 90em) and (max-width: 119.9375em)',
            '--xxlarge': 'screen and (min-width: 120em)',
            '--xxlarge-only': 'screen and (min-width: 120em) and (max-width: 99999999em)',
            '--mobile-s': '(min-width: 320px)',
            '--mobile-m': '(min-width: 375px)',
            '--mobile-l': '(min-width: 412px)',
            '--mobile': '(max-width: 599px)',
            '--tablet-s': '(min-width: 600px)',
            '--tablet-m': '(min-width: 768px)',
            '--tablet': '(min-width: 600px) and (max-width: 1023px)',
            '--desktop-s': '(min-width: 1024px)',
            '--desktop-m': '(min-width: 1280px)',
            '--desktop-l': '(min-width: 1440px)',
            '--desktop-xl': '(min-width: 1920px)',
            '--desktop': '(min-width: 1024px)'
        },
    },
    'postcss-color-mod-function': {
        unresolved: 'warn',
    },
    ...(config.keepCssVars === false && {
        'postcss-custom-properties': {
            preserve: false,
            importFrom: config.componentsTheme,
        }
    }),
};
