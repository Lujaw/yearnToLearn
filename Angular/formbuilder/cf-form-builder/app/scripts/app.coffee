# Services module.
angular.module 'cfFormBuilder.services', [ ]

# Controllers module.
angular.module 'cfFormBuilder.controllers', [ ]

# Directives module.
angular.module 'cfFormBuilder.directives', [ ]

# Filters module.
angular.module 'cfFormBuilder.filters', [ ]

# Application module.
angular.module('cfFormBuilder', [
  'cfFormBuilder.services'
  'cfFormBuilder.controllers'
  'cfFormBuilder.directives'
  'cfFormBuilder.filters'
  'restangular' 
])

  # Application configuration.
  .config (RestangularProvider, $httpProvider, $routeProvider) ->

    # API base URL.
    RestangularProvider.setBaseUrl '/api/'

    # Enable CORS.
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']

    # Application routes.
    $routeProvider

      .when '/',
        controller  : 'MainCtrl as main'
        templateUrl : 'templates/views/main.html'
      
      .otherwise
        redirectTo : '/'

  # Application runtime configuration and events.
  .run ($rootScope) ->

    # Show loading message on route change start.
    $rootScope.$on '$routeChangeStart', (event, next, current) ->
      $rootScope.showLoader = true

    # Hide loading message on route change success.
    $rootScope.$on '$routeChangeSuccess', (e, current, previous) ->
      $rootScope.showLoader = false
