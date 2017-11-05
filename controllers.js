//뷰과 서비스를 중재와 연결담당
angular.module('todoApp').controller('todoCtrl', function($scope, todoService, $http){ //app.controller() 와 동일한 구조 :: 변수에 담게 되면 모듈 분리시 다른 파일에서 사용시 어떤 모듈인지 모르기 때문에
    //$scope.data = todoService.read(); // services.js에서 return 해서 받아오는 거라서
    
    $http({
        method: 'GET',
        url : 'data.json'
    }).then (function success(responsed){
        console.log(responsed);
        $scope.data = responsed.data;
    });
    
    $scope.add = function(newTodo_title){
        todoService.create(newTodo_title); //실행 함수 :: index.html에서 실행하라고 정의해서
    };
    $scope.remove= function(index){
        todoService.delete(index);
    };

    $scope.update = function(){
        todoService.update();
    };

});
//var app= angular.module('todoApp',[]); // [] 라우터, 패키지 등을 넣을 수 있음