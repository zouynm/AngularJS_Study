//기능 담당 :: Factory , Service , Provider :: angular가 가지는 method
/*
CRUD :: create, read, update, delete
===============================================================
Factory : 기본적인 기능 담당
Service : 분할하여 객체 지향 방식
Provider : 내장함수 이용
*/

angular.module('todoApp').factory('todoService', function(){
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
            factory.data.push(newTodo);
            factory._setStorage();
        },

        read : function(){
            angular.copy(factory._getStorage(), factory.data); // _getStorage()에서 가져와서 factory.data에 값을 복사한다.
            return factory.data;
        },

        delete : function(index){
            factory.data.splice(index, 1);
            factory._setStorage();
        },

        update : function(){
            factory._setStorage();
        }
    };

    return factory;
});
