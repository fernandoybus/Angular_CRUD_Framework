var orderControllers = angular.module('orderControllers', []);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
orderControllers.controller('ListController', ['$scope', '$http', function($scope, $http, $compile) {
    $scope.firstName= "fernandoybus";
    $scope.lastName= "Azevedo";


    var dataObj = {user:"fernandoybus"};

    var res = $http.post("table.php", {user: 'fernandoybus'});

    res.success(function(response) {
    	console.log(response);
    	$scope.mytable = response;
    });

    // $scope.neworder = function() {
    //     console.log("posting data....");
    //      var dataObject = {
    //       order : $scope.firstName
    //       ,item  : $scope.lastName
    //    };
    //    console.log(dataObject);
       
    //     $http.post('post.php', JSON.stringify(dataObject)).success(function(html){
    //     /*success callback*/
    //     console.log(html);
    //     $scope.mytable = html;


    //     });
    // };



///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.deleteorder = function(id) {
        console.log("about to delete: " + id);
        var dataObject = {
          id : id,
          user: $scope.firstName
       };
       console.log(dataObject);
       
        $http.post('delete_order.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        $scope.mytable = html;
        // for(var i=0;i<html.length;i++){
        //     var obj = html[i];
        //     for(var key in obj){
        //         var attrName = key;
        //         console.log(attrName);
        //         var attrValue = obj[key];
        //         console.log(attrValue);

        //     }
        //}
        });
    };



}]);



///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////



orderControllers.controller('ViewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.firstName= "fernandoybus";
    $scope.whichItem = $routeParams.itemId;

    var dataObj = {
        user:"fernandoybus", 
        id: $routeParams.itemId
    };
    console.log(dataObj);

    var res = $http.post("order.php", dataObj);

    res.success(function(response) {
        console.log(response);
        $scope.order = response;
    });

}]);


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

orderControllers.controller('NewOrderController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.firstName= "fernandoybus";

    $scope.neworder = function() {
        console.log("posting data....");
        html = $scope.choices;
        var items = ""
        for(var i=0;i<html.length;i++){
            var obj = html[i];
            for(var key in obj){
                var attrName = key;
                console.log(attrName);
                if (attrName == 'name'){
                    var attrValue = obj[key];
                    console.log(attrValue);
                    if (items.length > 0 ) {
                    items = items + ', ' + attrValue;
                    }else{
                        items = attrValue;
                    }
                }
                

            }
        }
        console.log('items');
        console.log(items);
         var dataObject = {
          order : $scope.order
          ,item  : items
       };
       console.log(dataObject);
       
        $http.post('post.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        
        $( ".table" ).addClass( "myClass yourClass" );
        $( ".table" ).show();
        $( ".table" ).show();
        $( ".createneworder" ).removeClass('hidden');
        $(".form_new_order").hide();
        $scope.mytable = html;


        });
    };

    $scope.choices = [{id: 'choice1'}];

    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':'choice'+newItemNo});
    };

    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };

    $scope.deleteorder = function(id) {
        console.log("about to delete: " + id);
        var dataObject = {
          id : id,
          user: $scope.firstName
       };
       console.log(dataObject);
       
        $http.post('delete_order.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        $scope.mytable = html;
        // for(var i=0;i<html.length;i++){
        //     var obj = html[i];
        //     for(var key in obj){
        //         var attrName = key;
        //         console.log(attrName);
        //         var attrValue = obj[key];
        //         console.log(attrValue);

        //     }
        //}
        });
    };

}]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

orderControllers.controller('EditController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.firstName= "fernandoybus";
    $scope.whichItem = $routeParams.itemId;


    var dataObj = {
        user:"fernandoybus", 
        id: $routeParams.itemId
    };
    console.log(dataObj);

    var res = $http.post("getordertoedit.php", dataObj);
    res.success(function(response) {
        console.log(response);
        for(var i=0;i<response.length;i++){
            var obj = response[i];
            for(var key in obj){
                var attrName = key;
                console.log(attrName);
                if (attrName ==  "ordername"){

                    var attrValue = obj[key];
                    console.log(attrValue);
                    $scope.ordername = attrValue;

                }
                if (attrName ==  "items"){
                    console.log("crating array from items");
                    var attrValue = obj[key];
                    console.log(attrValue);
                    var arr = attrValue.split(",");
                    console.log(arr);
                    $scope.choices = []; //new array to hold values
                    var item;
                    // cretaing like a JSON
                    var text = "[";
                    for (i = 0; i < arr.length; i++) { 
                        console.log("arr: " + arr[i])
                        item = {id:arr[i]};
                        console.log(item);
                        $scope.choices.push(item);
                        //console.log($scope.choices);


                    }
                    //text = text + ']';
                    //text = text.replace(",]", "]");
                    //console.log("text: " + text);
                    //$scope.choices =  text;
                    //console.log($scope.choices);
                    //$scope.choices = [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];
                    //console.log($scope.choices);

                    //$scope.choices = [{id: 'choice1'}, {id: 'choice2'}, {id: 'choice3'}];
                    console.log($scope.choices);
                    

                }
               

            }
        }

    });



    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':'item'+newItemNo});
    };

    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };

    $scope.savechanges = function() {
        console.log("savind data....");
        html = $scope.choices;
        var items = ""
        for(var i=0;i<html.length;i++){
            var obj = html[i];
            for(var key in obj){
                var attrName = key;
                console.log(attrName);
                if (attrName == 'id'){
                    var attrValue = obj[key];
                    console.log(attrValue);
                    if (items.length > 0 ) {
                    items = items + ', ' + attrValue;
                    }else{
                        items = attrValue;
                    }
                }
                

            }
        }
        console.log('items');
        console.log(items);
         var dataObject = {
          id :  $scope.whichItem, 
          user :  $scope.firstName, 
          order : $scope.ordername,
          item  : items
       };
       console.log(dataObject);
       
        $http.post('savechanges.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        
        $( ".table" ).addClass( "myClass yourClass" );
        $( ".table" ).show();
        $( ".form_new_order" ).hide();
        $scope.mytable = html;


        });
    };




}]);


