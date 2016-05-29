(function() {
  // define Vue.js app
  new Vue({
    el: '#app',
    data: { },
    ready: function() {
      // GET request
      this.$http({url: 'links.json', method: 'GET'}).then(function (response) {
          // set data on vm
          this.$set('linksAr', response.data.linksAr);
          //console.table(response.data.linksAr);
      }, function (response) {
        this.$set('linksAr', null);
          console.error(response);
      });
    }
  });

})();
