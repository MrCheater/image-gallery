module.exports = {
    webpack: config => {
        const entry = config.entry;
        config.entry = async (...args) => {
            const result = await entry(...args);
            result['main.js'] = [
                'babel-polyfill',
                'regenerator-runtime/runtime',
                ...result['main.js'],
            ];
            return result;
        };
        if (config.resolve.alias) {
            delete config.resolve.alias['react'];
            delete config.resolve.alias['react-dom'];
        }
        return config;
    },
};
