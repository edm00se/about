// aysnc, late loading, custom fonts
WebFontConfig = {
  google: { families: [ 'Lato:300italic,700italic,300,700' ] }
};
(function() {
  var proto = 'https:' == document.location.protocol ? 'https' : 'http';

  var wf = document.createElement('script');
  wf.src = proto + '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);

  var h = document.getElementsByTagName('head')[0];
  var l = document.createElement('link');
  l.href= proto + '://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css';
  l.rel="stylesheet";
  h.appendChild(l);

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
