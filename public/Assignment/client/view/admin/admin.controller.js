/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService,$rootScope,$location){
        var adm = this;
        adm.message = null;
        adm.addUser = addUser;
        adm.update = update;
        adm.deleteUser = deleteUser;
        adm.editUser = editUser;
        function init(){
            if($rootScope.currentUser.roles.indexOf("admin") == -1 )
            $location.url("/home");
            UserService.findAllUsers()
                .then(function(response){
                    adm.users=response.data;
                    console.log(response.data);
                })
        }init();

        function addUser(user){
            if(user.username==null){
                adm.message = "Invalid username/password!";
                console.log(adm.message);
                return;
            }
            UserService.createUser(user)
                .then(function(response){
                    init();
                });
        }

        function update(user){
            console.log(user);
            UserService.adminUpdate(user)
                .then(function(response){
                    init();
                });
        }

        function deleteUser(userId){
            UserService.deleteUserById(userId)
                .then(function(response) {
                    init();
                });
        }

        function editUser(user){
            adm.NewUser = {
                _id:user._id,
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                roles:user.roles,
            };
        }

    }
})();