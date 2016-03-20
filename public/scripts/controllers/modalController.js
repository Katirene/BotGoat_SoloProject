myApp.controller('ModalController', function ($scope, $uibModal, $log) {

	console.log('inside Modal Controller');

  $scope.open = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './templates/modal.html',
      controller: 'ModalInstanceCtrl'
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

myApp.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'DataFactory', function ($scope, $uibModalInstance, DataFactory) {

  $scope.dataFactory = DataFactory;

  //$scope.deploy = deploy;

  $scope.step = 1;
  $scope.finalStep = 2;

  $scope.next = function () {
  	if($scope.step < $scope.finalStep)
  		$scope.step++;
    //$uibModalInstance.close($scope.selected.item);
  };

  $scope.back = function () {
  	if($scope.step > 0)
  		$scope.step--;
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.deploy = function () {
    $scope.dataFactory.deployBot();
    $uibModalInstance.dismiss('deploy');
  }

}]);