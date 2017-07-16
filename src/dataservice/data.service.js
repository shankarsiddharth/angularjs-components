app.service('dataService', ['$http', '$rootScope', function ($http, $rootScope) {
    let loginDetails = {
        "username": "test@test.test",
        "password": "testtest"
    };
    this.login = function () {
        return $http({
            method: 'POST',
            url: 'https://apidev.omnea.org/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: loginDetails
        });
    }
    let getData = function (options) {
        return $http({
            method: 'POST',
            url: 'https://apidev.omnea.org/ca-internal/accounts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $rootScope.token
            },
            data: options
        });
    }
    this.getData = function (options) {
        return getData(options);
    }
}]);