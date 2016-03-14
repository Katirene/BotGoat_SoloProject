myApp.controller('ModalController', function ($scope, $uibModal, $log) {

	console.log('inside Modal Controller')

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

myApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.step = 1;
  $scope.finalStep = 4;

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
});