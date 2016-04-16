'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', ['$scope', '$http',  function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.wew = 'Yrkeslista';

    $http.get('./data/jobbstat_man.json').success(function(data) {
          $scope.dataset = data;
        });
    $http.get('./data/jobbstat_kvinna.json').success(function(data) {
          $scope.dataset2 = data;
        });

    $scope.selectedID = '0000';

    $scope.labels = ['book','book','pencil','university','cog','industry','leaf','heart','briefcase','question'];


    //$scope.objectData;

 
    //$scope.backgroundcolor = 'rgba(222, 230, 243, 0.31)';

    $scope.memes = function(x){
      //console.log(x);
      return 'rgba(51, 122, 183, ' + x/$scope.currentObject.maxVal + ')';

    };

    $scope.createDataset = function(){
      $scope.totaldata = {

      };
      for (var key in $scope.dataset.dataset.dimension.Yrke2012.category.label) {

        //console.log($scope.dataset.dataset.dimension.Yrke2012.category.label[key] + ' ' + key);
        $scope.totaldata[key] = $scope.create(key);
        $scope.totaldata[key].label = $scope.dataset.dataset.dimension.Yrke2012.category.label[key];

      }

      console.log($scope.totaldata);
    };

    $scope.create = function(selected){
      $scope.currentObject = {
        total:0,
        totalMan:0,
        totalKvinnor:0,
        maxVal:0,
        rowVal:[0,0,0,0,0,0,0,0,0,0],
        columnVal:[0,0,0,0,0,0,0,0,0],
        cell:[]

      };
      $scope.selectedID = selected;
      $scope.objectData1 =  $scope.dataset.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);
      $scope.objectData2 =  $scope.dataset2.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);

      //console.log($scope.objectData1);
      //console.log($scope.objectData2);

      for (var i = 0; i < $scope.objectData1.length; i++) {
        //console.log($scope.objectData1[i]);

        var currentCell = {
          man: $scope.objectData1[i],
          kvinnor: $scope.objectData2[i],
          total: $scope.objectData1[i] + $scope.objectData2[i],
          column: i % 9,
          row: Math.floor(i/9)

        };
        $scope.currentObject.cell[i] = currentCell;
        $scope.currentObject.total += currentCell.total;
        $scope.currentObject.totalMan += currentCell.man;
        $scope.currentObject.totalKvinnor += currentCell.kvinnor;
        $scope.currentObject.columnVal[currentCell.column] += currentCell.total;
        $scope.currentObject.rowVal[currentCell.row] += currentCell.total;

        if (currentCell.total > $scope.currentObject.maxVal) {
          //console.log('Maxval: ' + currentCell.total);
          $scope.currentObject.maxVal = currentCell.total;
        }
      }

      //console.log($scope.currentObject);
      return $scope.currentObject;
      
    };


    $scope.select = function(selected){
      $scope.currentObject = {
        total:0,
        totalMan:0,
        totalKvinnor:0,
        maxVal:0,
        rowVal:[0,0,0,0,0,0,0,0,0,0],
        columnVal:[0,0,0,0,0,0,0,0,0],
        cell:[]

      };
    	$scope.selectedID = selected;
      $scope.objectData1 =  $scope.dataset.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);
      $scope.objectData2 =  $scope.dataset2.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);

      console.log($scope.objectData1);
      console.log($scope.objectData2);

      for (var i = 0; i < $scope.objectData1.length; i++) {
        //console.log($scope.objectData1[i]);

        var currentCell = {
          man: $scope.objectData1[i],
          kvinnor: $scope.objectData2[i],
          total: $scope.objectData1[i] + $scope.objectData2[i],
          column: i % 9,
          row: Math.floor(i/9)

        };
        $scope.currentObject.cell[i] = currentCell;
        $scope.currentObject.total += currentCell.total;
        $scope.currentObject.totalMan += currentCell.man;
        $scope.currentObject.totalKvinnor += currentCell.kvinnor;
        $scope.currentObject.columnVal[currentCell.column] += currentCell.total;
        $scope.currentObject.rowVal[currentCell.row] += currentCell.total;

        if (currentCell.total > $scope.currentObject.maxVal) {
          console.log('Maxval: ' + currentCell.total);
          $scope.currentObject.maxVal = currentCell.total;
        }
      }

      console.log($scope.currentObject);

    };

    $scope.getCurrentIndex = function(){
    	
    	return $scope.dataset.dataset.dimension.Yrke2012.category.index[$scope.selectedID];
    };

    $scope.crunch = function(x,y,z){

    	return x*y+z;
    };






  }]);
