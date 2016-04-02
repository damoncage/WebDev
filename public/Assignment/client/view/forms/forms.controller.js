/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(FormService,UserService,$scope,$location)
    {
        var user;
        //controller initialization
        function init(){
        UserService.getCurrentUser()
            .then(function(response){
                    user = response.data;
                    console.log("form",user);
                    if(!user){
                        $location.url("/login");
                        return;
                    }
                    FormService
                        .findAllFormsForUser(user._id)
                        .then(function(response){
                            if(response.data != null)
                            {$scope.Forms = response.data;}
                            else {$scope.Forms = [];}
                            console.log($scope.Forms);
                        });
                    //event handler declaration
                    $scope.addForm = addForm;
                    $scope.updateForm = updateForm;
                    $scope.deleteForm = deleteForm;
                    $scope.selectForm = selectForm;
         },function(err){
                console.log("Fail to retrive forms!");
            });
        }init();

        //event handler implementation
        function addForm(form) {
            if(!form)
            return;
            form = {
                title:form.title,
                userId: form.userId
            };
            FormService
                .createFormForUser(user._id,form)
                .then(function(response){
                    return FormService
                        .findAllFormsForUser(user._id)
                })
                .then(function(response) {
                    console.log(response);
                    $scope.Forms = response.data;
                    $scope.form = null;
                });
        }

        function updateForm(newform){
            FormService.updateFormById($scope.form._id,newform);
            console.log(newform);
            FormService
                .findAllFormsForUser(user._id)
                .then(function(response){
                    if(response.data != null)
                    {$scope.Forms = response.data;}
                    else {$scope.Forms = null;}
                })
            $scope.form = null;
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.Forms[index]._id);
            console.log(index,$scope.Forms[index]._id);
            FormService
                .findAllFormsForUser(user._id)
                .then(function(response){
                    if(response.data != null)
                    {$scope.Forms = response.data;}
                    else {$scope.Forms = null;}
                })
        }

        function selectForm(form){
            $scope.form = {
                _id:form._id,
                title: form.title,
                userId: form.userId
            };
        }
    }
})();
