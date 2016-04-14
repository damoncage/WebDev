/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$rootScope,$location){
        var adm = this;
        adm.add = add;
        adm.update = update;
        function init(){
            if($rootScope.currentUser.roles.indexOf("admin") == -1 )
            $location.url("/home");
            UserService.findAllUsers()
                .then(function(response){
                    adm.users=response.data;
                    console.log(response.data);
                })
        }init();

        function add(user){

        }

        function update(user){

        }
    }
})();