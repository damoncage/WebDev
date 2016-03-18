/**
 * Created by cage on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);
    function FormController(FormService,UserService,$scope)
    {
        //controller initialization
        var user = UserService.getCurrentUser();
        $scope.Forms = FormService.findAllFormsForUser(user._id);

        //event handler declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //event handler implementation
        function addForm(form) {
            if(!form)
            return;
            var newform = {
                title: form.title
            }
            console.log(user._id,newform);
            FormService
                .createFormForUser(user._id,newform)
                .then(function(response){
                    console.log(response);
                $scope.Forms = FormService.findAllFormsForUser(user._id);
                $scope.form = null;
            });

        }

        function updateForm(newform){
            FormService.updateFormById($scope.form._id,newform);
            console.log($scope.form._id);
            $scope.Forms = FormService.findAllFormsForUser(user._id);
            $scope.form = null;
        }

        function deleteForm(index){
            console.log(index);
            FormService.deleteFormById($scope.Forms[index]._id);
            $scope.Forms = FormService.findAllFormsForUser(user._id);
        }

        function selectForm(index){
            $scope.form = {
                _id:$scope.Forms[index]._id,
                title: $scope.Forms[index].title,
                userId: $scope.Forms[index].userId
            };
            console.log(index);
        }
    }
})();
