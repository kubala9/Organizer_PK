export const footer = {
  template: require('./footer.html'),
  controller: $scope => {
      $scope.year = new Date().getFullYear();
  }
};
