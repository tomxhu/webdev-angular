
var OnlineUniversity = angular.module('OnlineUniversity', []);

//Controller for angular app
OnlineUniversity.controller('OnlineUniversityController', function ($scope, $http) {
    $scope.modalType = 1;
    $scope.modalTitle = "Create New Course";

    //Get list of courses
    $http.get('/api/course').success(function (response) {

            $scope.courses = response;
            //Remove course at specified index
            $scope.delete = function (index) {
                var course = $scope.courses[index];
                $scope.deletedCourse = course.name;
                //Http call to delete course
                $http.delete('/api/course/' + index).success(function (response) {
                        $scope.courses = response;
                    });
            };
        });
    //Create a new course
    $scope.create = function (newCourse) {
        $http.post('/api/course', newCourse).success(function (response) {
                $scope.courses = response;
            });
    };

    $scope.selectedIndex = null;
    ///Select a course to update
    $scope.select = function (index) {
        $scope.modalTitle = "Update Course";
        $scope.modalType = 2;
        $scope.newCourse = $scope.courses[index];
        $scope.selectedIndex = index;
    };
    //Updates the selected course
    $scope.edit = function (newCourse) {
        //Http call to update course
        $http.put('/api/course/' + $scope.selectedIndex, newCourse).success(function (response) {
                $scope.courses = response;
            });
    };
    //Checks if we are creating a new course or updating a course
    //because they use the same modal
    $scope.update = function (newCourse) {
        if ($scope.modalType == 1) {
            $scope.create(newCourse);
        }
        if ($scope.modalType == 2) {
            $scope.edit(newCourse);
        };
    };
});