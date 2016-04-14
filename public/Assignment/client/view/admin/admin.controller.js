/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService){
        var adm = this;
        adm.add = add;
        adm.update = update;

        function add(user){

        }

        function update(user){

        }
    }
})();