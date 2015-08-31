var orderControllers = angular.module('orderControllers', []);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
orderControllers.controller('ListController', ['$scope', '$http', function($scope, $http, $compile) {
    //$scope.username= "fernandoybus";


    



    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // thats right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };
    

    

    $scope.logout = function(id) {
        console.log("logout....");


        //DESTROY COOKIE
        var cname = "";
        document.cookie = "angular" + '=; Max-Age=0'
        $scope.changeRoute('#/login');
       
    };





    

    // READ COOKIE
    var name = "angular" + "=";
    var ca = document.cookie.split(';');
    var user;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) user= c.substring(name.length, c.length);
    }
   
    if (user != undefined) {
        $scope.username = user;
        console.log("Welcome again " + user);
    } else {
        console.log("no login");
        $scope.changeRoute('#/login');
    }


    var dataObj = {user: $scope.username };
    console.log(dataObj);

    var res = $http.post("table.php", dataObj);

    res.success(function(response) {
    	console.log(response);
        if (response != 0){
    	    $scope.mytable = response;
        }
    });







///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.deleteorder = function(id) {
        console.log("about to delete: " + id);
        var dataObject = {
          id : id,
          user: $scope.username
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
    //$scope.username= "fernandoybus";
    $scope.whichItem = $routeParams.itemId;


    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    // READ COOKIE
    var name = "angular" + "=";
    var ca = document.cookie.split(';');
    var user;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) user= c.substring(name.length, c.length);
    }
   
    if (user != undefined) {
        $scope.username = user;
        console.log("Welcome again " + user);
        //$scope.changeRoute('#/orders');
    } else {
    
        console.log("no login");
        $scope.changeRoute('#/login');
    }


    var dataObj = {
        user:$scope.username, 
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


//IMAGE FUNCTIONS

orderControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

orderControllers.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(html){
            console.log(html);
            console.log("success");
            //console.log(uploadUrl);
            console.log(fd);
        })
        .error(function(){
            console.log("error");
        });
    }
}]);




///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

orderControllers.controller('NewOrderController', ['$scope', '$http', '$routeParams', 'fileUpload', function($scope, $http, $routeParams, fileUpload) {
    $scope.firstName= "fernandoybus";



    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    // READ COOKIE
    var name = "angular" + "=";
    var ca = document.cookie.split(';');
    var user;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) user= c.substring(name.length, c.length);
    }
   
    if (user != undefined) {
        $scope.username = user;
        console.log("Welcome again " + user);
        //$scope.changeRoute('#/orders');
    } else {
    
        console.log("no login");
        $scope.changeRoute('#/login');
    }


    function func() {
        console.log('wait 2 sec');
    }


    $scope.neworder = function() {

        //handling image
        var file = $scope.myFile;
        console.log('file is ' + file.name);
        $scope.image = file.name;
        console.dir(file);
        var uploadUrl = "imageupload.php";
        //fileUpload.uploadFileToUrl(file, uploadUrl);
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(html){
            setTimeout(func, 2000); // wait for picture to upload 2 seconds 
            $scope.image = html;
            console.log(html);
            console.log("success");
        })
        .error(function(){
            console.log("error");
        });






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
          user: $scope.username,
          order : $scope.order,
          item  : items,
          image : $scope.image
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
          user: $scope.username
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
    //$scope.username= "fernandoybus";
    $scope.whichItem = $routeParams.itemId;



    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    // READ COOKIE
    var name = "angular" + "=";
    var ca = document.cookie.split(';');
    var user;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) user= c.substring(name.length, c.length);
    }
   
    if (user != undefined) {
        $scope.username = user;
        console.log("Welcome again " + user);
        //$scope.changeRoute('#/orders');
    } else {
    
        console.log("no login");
        $scope.changeRoute('#/login');
    }


    var dataObj = {
        user: $scope.username, 
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
        console.log("saving data....");



        //handling image
        if ($scope.myFile){
            console.log("There is an image");
        var file = $scope.myFile;
        console.log('file is ' + file.name);
        $scope.image = file.name;
        console.dir(file);
        var uploadUrl = "imageupload.php";
        //fileUpload.uploadFileToUrl(file, uploadUrl);
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(html){
            $scope.image = html;
            console.log(html);
            console.log("success");
        })
        .error(function(){
            console.log("error");
        });

        }else{
            console.log("no image");
        }


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
          user :  $scope.username, 
          order : $scope.ordername,
          item  : items,
          image : $scope.image
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



///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
orderControllers.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $compile, $location) {
    $scope.username= "";
    $scope.password= "";


    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    // READ COOKIE
    var name = "angular" + "=";
    var ca = document.cookie.split(';');
    var user;
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) user= c.substring(name.length, c.length);
    }
   
    if (user != undefined) {
        $scope.username = user;
        console.log("Welcome again " + user);
        $scope.changeRoute('#/orders');
    } else {
    
        console.log("no login");
        $scope.changeRoute('#/login');
    }

    if (!user){





    }


    $scope.dologin = function() {
        console.log("logging in....");
         var dataObject = {
          user : $scope.username
          ,password  : $scope.password
       };
       console.log(dataObject);
       
        $http.post('dologin.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        if (html ==  "1"){
        // redirect to orders if logged in
        //$location.path("/orders");
       
        //CREATE COOKIE
        var cname = "angular";
        var cvalue = $scope.username;
        var exdays = 10;
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
        $scope.changeRoute('#/orders');
        }
        else{
            $scope.username= "";
            $scope.password= "";
            $scope.message ="Could not login";
            console.log($scope.message);
        }

        });
    };



    $scope.register = function() {
        console.log("change to registration....");
        $scope.changeRoute('#/register');

    };

    $scope.recoverpassword = function() {
        console.log("Recover password....");
        $scope.changeRoute('#/recover_password');

    };


}]);



///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
orderControllers.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $compile, $location) {
    $scope.username= "";
    $scope.password= "";






    $scope.doregister = function() {
        console.log("registering new user....");
         var dataObject = {
          newusername : $scope.newusername
          ,newpassword  : $scope.newpassword,
          newemail :$scope.newemail
       };
       console.log(dataObject);
       
        $http.post('doregister.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        if (html ==  1){
        // redirect to orders if logged in
        //$location.path("/orders");
        var cname = "angular";
        var cvalue = $scope.username;
        var exdays = 10;
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
        $scope.changeRoute('#/orders');
        }
        else{
            $scope.message ="Could not create new user. Maybe email already exists";
            console.log($scope.message);
        }

        });
    };

    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
    };

    $scope.login = function() {
        console.log("back to login....");
        $scope.changeRoute('#/login');

    };

    $scope.register = function() {
        console.log("back to registration....");
        $scope.changeRoute('#/register');

    };

    $scope.recoverpassword = function() {
        console.log("Recover password....");
        $scope.changeRoute('#/recover_password');

    };

}]);


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
orderControllers.controller('RecoverController', ['$scope', '$http', '$location', function($scope, $http, $compile, $location) {
    $scope.username= "";
    $scope.password= "";



    $scope.dorecover = function() {
        console.log("recover password....");
         var dataObject = {
                emailrecover  : $scope.emailrecover
       };
       console.log(dataObject);
       
        $http.post('recoverpassword.php', JSON.stringify(dataObject)).success(function(html){
        /*success callback*/
        console.log(html);
        if (html ==  "1"){
            $scope.message ="Email sent.";
            console.log($scope.message);
        }
        else{
            $scope.message ="Could not verify your email";
            console.log($scope.message);
        }

        });
    };





}]);