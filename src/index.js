(function() {
  const directives = [];

  const smallAngular = {
    directive(name, callback) {
      directives.push({ name, callback });
    },
    compile(node) {
      // do smth
    },
    bootstrap(node) {
      // do smth
    }
  };
  window.smallAngular = smallAngular;
})();