(function () {
    angular
        .module("cageViews")
        .controller("detailController", detailController);

    function detailController($scope,$stateParams) {
            $scope.name = $stateParams.name;
    }
})();
