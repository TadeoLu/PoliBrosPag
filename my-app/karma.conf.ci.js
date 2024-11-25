module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      files: [
        'src/**/*.js',
        'src/app/*.spec.js'
      ],
      preprocessors: {
        'src/**/*.js': ['coverage']
  
      },
      reporters: ['progress', 'coverage'],
      browsers: ['ChromeHeadlessNoSandbox'],
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox']
        }
      },
      singleRun: true,
      failOnEmptyTestSuite: false,
      concurrency: Infinity
    });
  };