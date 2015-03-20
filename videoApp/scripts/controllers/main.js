'use strict';

/**
 * @ngdoc function
 * @name videoappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the videoappApp
 */
angular.module('videoappApp')
  .controller('MainCtrl', function ($scope, $http) {

    var iTotal = 0;
  	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    // $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [6],
        pageSize: 6,
        currentPage: 1
    };

    $scope.setPagingData = function(data, page, pageSize){	
        // var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = data;
        // $scope.totalServerItems = data.length;
        $scope.pagingOptions.totalServerItems = iTotal;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                // $http.get('videoData.json').success(function (largeLoad) {    
                $http.get('rest_api.php?i=' + 6 + '&page=' + page).success(function (oReturnedData) {		
                  var largeLoad = oReturnedData.data;
                  iTotal = oReturnedData.total;

                    data = largeLoad.filter(function(item) {
                        // return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        return item.title.toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                // $http.get('videoData.json').success(function (largeLoad) {
                $http.get('rest_api.php?i=' + 6 + '&page=' + page).success(function (oReturnedData) {
                    var largeLoad = oReturnedData.data;
                    iTotal = oReturnedData.total;
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };
	
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
	
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
	
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
		showFooter: true,
        // totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs : [{
  			field:'id', 
  			displayName:'ID'
  		}, {
  			field:'title', 
  			displayName:'Title'
  		}, {
  			field:'longDescription', 
  			displayName:'Description'
  		}, {
  			field:'links.logo-image', 
  			displayName:'Logo Image',
  			cellTemplate: "<div class=\"videoTableLogo\"><img src='{{row.getProperty(col.field)}}'/></div>"
  		}]
    };

  });
