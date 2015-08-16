var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";

    var dataObj = {user:"fernandoybus"};

    var res = $http.post("table.php", {user: 'fernandoybus'});

    res.success(function(response) {
    	console.log(response);
    	$scope.mytable = response;});



    // function mytableFunction() {
    // var usardata ="test='test'";
	// $.ajax({
	// 		type: 'post',
	// 		url: 'table.php',
	// 		data: "test='test'",
	// 		success: function (html) {
	// 		   console.log(html);
	// 		   var obj = JSON.parse(html);
	// 		   return obj;
	// 		}
	// });
 //    }

 //    $scope.mytable = mytableFunction();


    // [
    //     {user:'Jani',order:'Norway', item:'item 1'},
    //     {user:'Hege',order:'Sweden', item:'item 1'},
    //     {user:'Kai',order:'Denmark', item:'item 1'}
    // ];
});
