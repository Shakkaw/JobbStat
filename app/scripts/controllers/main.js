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
          $http.get('./data/jobbstat_kvinna.json').success(function(data) {
            $scope.dataset2 = data;
            $http.get('./data/jobbstat_region.json').success(function(data) {
              $scope.regiondata = data;
              $scope.createDataset();
            });
          });
        });
    /*
    $http.get('./data/jobbstat_kvinna.json').success(function(data) {
          $scope.dataset2 = data;
        });

    $http.get('./data/jobbstat_region.json').success(function(data) {
          $scope.regiondata = data;
        });
        */

    $scope.selectedID = '0000';

    $scope.labels = ['book','book','pencil','university','cog','industry','leaf','heart','briefcase','question'];


    //$scope.objectData;

 
    //$scope.backgroundcolor = 'rgba(222, 230, 243, 0.31)';

    $scope.memes = function(x){
      //console.log(x);
      return 'rgba(51, 122, 183, ' + x/$scope.currentObject.maxVal + ')';

    };

    $scope.wewlad = function(){
      return 'aaa';
    };

    $scope.generateSearch = function(){
      $scope.searchObject = [];
      var index = 0;
      for (var key in $scope.totaldata) {
        $scope.searchObject[index] = {key:key, label: $scope.totaldata[key].label};
        index++;
      }
      console.log($scope.searchObject);
    };

    $scope.createDataset = function(){
      $scope.totaldata = {

      };
      for (var key in $scope.dataset.dataset.dimension.Yrke2012.category.label) {

        //console.log($scope.dataset.dataset.dimension.Yrke2012.category.label[key] + ' ' + key);
        $scope.totaldata[key] = $scope.create(key);
        $scope.totaldata[key].label = $scope.dataset.dataset.dimension.Yrke2012.category.label[key];


      }
      console.log($scope.regiondata.dataset.dimension.Region.category.index);
      for (key in $scope.regiondata.dataset.dimension.Region.category.index) {
        console.log(key + ' ' + $scope.regiondata.dataset.dimension.Region.category.index[key] + ' ' + $scope.regiondata.dataset.dimension.Region.category.label[key]);
        
        var currentRegion = {
          index: $scope.regiondata.dataset.dimension.Region.category.index[key],
          label: $scope.regiondata.dataset.dimension.Region.category.label[key]
        };

        var regionStart = $scope.regiondata.dataset.dimension.Region.category.index[key] * 860;
        var regionEnd = $scope.regiondata.dataset.dimension.Region.category.index[key] * 860 + 860;

        var currentData = $scope.regiondata.dataset.value.slice(regionStart,regionEnd);

        console.log(currentRegion);
        console.log(currentData);


        //console.log(currentData);
        for (var key2 in $scope.regiondata.dataset.dimension.Yrke2012.category.index) {
          //$scope.totaldata[key2].region[key] = {total: 0, man: 0, kvinnor: 0};
          var total = currentData[$scope.regiondata.dataset.dimension.Yrke2012.category.index[key2]*2 + $scope.regiondata.dataset.dimension.Yrke2012.category.index[key2]*2+1];
          var man = currentData[$scope.regiondata.dataset.dimension.Yrke2012.category.index[key2]*2];
          var kvinnor = currentData[$scope.regiondata.dataset.dimension.Yrke2012.category.index[key2]*2+1];


          $scope.totaldata[key2].region[key] = {total: total, man: man, kvinnor: kvinnor};

        }
      }

      console.log($scope.totaldata);
      $scope.generateSearch();
    };

    $scope.create = function(selected){
      $scope.currentObject = {
        id: 0,
        total:0,
        totalMan:0,
        totalKvinnor:0,
        maxVal:0,
        rowVal:[0,0,0,0,0,0,0,0,0,0],
        columnVal:[0,0,0,0,0,0,0,0,0],
        cell:[],
        regionMaxMan:0,
        regionMinMan:0,
        regionMaxKvinnor:0,
        regionMinKvinnor:0,
        region:[]

      };
      $scope.selectedID = selected;
      $scope.objectData1 =  $scope.dataset.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);
      $scope.objectData2 =  $scope.dataset2.dataset.value.slice($scope.getCurrentIndex()*90,$scope.getCurrentIndex()*90+90);
      $scope.currentObject.id = selected;
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
        //console.log(selected);

        if (currentCell.total > $scope.currentObject.maxVal) {
          //console.log('Maxval: ' + currentCell.total);
          $scope.currentObject.maxVal = currentCell.total;
        }


      }

      //console.log($scope.currentObject);
      return $scope.currentObject;
      
    };

    $scope.select = function(selected){
      console.log($scope.totaldata[selected]);
      $scope.currentObject = $scope.totaldata[selected];
    };


    $scope.select2 = function(selected){
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
