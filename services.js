//기능 담당 :: Factory , Service , Provider :: angular가 가지는 method
/*
CRUD :: create, read, update, delete
===============================================================
Factory : 기본적인 기능 담당
Service : 분할하여 객체 지향 방식
Provider : 내장함수 이용
*/

angular.module('todoApp')
.constant('baseURL', 'http://loocalhost:9000/todolist')
.factory('todoService', function($http, baseURL){
    var factory = {
        _setStorage : function(){
            localStorage.setItem("data", JSON.stringify(factory.data));
        },
        _getStorage : function(){
            return JSON.parse(localStorage.getItem("data"));
        },

        data : [  //READ :: 입력담당
        ],

        create : function(newTodo_title){
            var newTodo = {
                title : newTodo_title,
                compeleted : false,
                createdAt : Date.now()
            }
            $http({
                method : 'POST',
                url : baseURL,
                data : newTodo
            }).then(function success(response){
                factory.data.push(response.data);    
            });
            //factory.data.push(newTodo);
            //factory._setStorage();
        },

        read : function(){
            // angular.copy(factory._getStorage(), factory.data); // _getStorage()에서 가져와서 factory.data에 값을 복사한다.
            // return factory.data;
           
            $http({
                method : 'GET',
                url : baseURL
            }).then(function success(response){
                angular.copy(response.data, factory.data);
            });
            return factory.data;
        },

        delete : function(todo){
            $http({
                method : 'DELETE',
                url : baseURL+'/'+todo.id   //REST 방식에는 '?'를 사용하지 않는다
            }).then(function success(){
                console.log(todo)
                factory.data.splice(factory.data.indexOf(todo), 1);
                alert('삭제가 성공되었습니다.');
                location.reload();
            });
            // factory.data.splice(index, 1);
            // factory._setStorage();
        },

        update : function(todo){
            $http({
                method : 'PUT',
                url : baseURL+'/'+todo.id,
                data : todo
            }).then(function success(response){
                //console.log(response)
            });
            // factory._setStorage();
        }
    };

    return factory;
});
