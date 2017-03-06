myApp.controller("mediaController", ['$scope', function($scope){
  console.log('In mediaController');
    //show/ hide gallery variables
    $scope.hideMediaSelect= false;
    $scope.showPhotoGallery= false;
    $scope.showVideoGallery= false;
    // set footer position for page
    angular.element(document.getElementById("footerSection")).css("position","fixed");
    // select path for which gallery to display
    $scope.launchGallery = function(galleryType){
      $scope.hideMediaSelect = true;
      if(galleryType == "photos"){
        $scope.showPhotoGallery = true;
      }
      if(galleryType == "videos"){
        $scope.showVideoGallery = true;
      }
    };
}]);
