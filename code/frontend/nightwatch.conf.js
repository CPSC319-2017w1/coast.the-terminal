module.exports = {
  'src_folders': [
    'test-selenium'
  ],
  'output_folder': 'reports',
  'selenium': {
    'start_process': true,
    'server_path': 'selenium-server-standalone-3.7.1.jar',
    'log_path': '',
    'host': '127.0.0.1',
    'port': 4445,
    'cli_args': {
      'webdriver.chrome.driver': 'chromedriver',
      'webdriver.ie.driver': ''
    }
  },
  'test_settings': {
    'default': {
      'launch_url': 'http://localhost:1234',
      'selenium_port': 4445,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': false,
        'path': ''
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },
    'ch': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
};
