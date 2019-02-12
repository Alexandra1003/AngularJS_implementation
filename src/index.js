(function() {
  const directives = [];

  function findInitialNode() {
    const arrOfAllNodes = Array.from(document.querySelectorAll('*'));

    return arrOfAllNodes.find(node => {
      return node.hasAttribute('ng-app');
    });
  }

  const smallAngular = {
    directive(name, callback) {
      directives.push({ name, callback });
    },
    compile(node) {
      // do smth
    },
    bootstrap(node) {
      const nodeElem = node ? node : findInitialNode();

      if (node) {
        nodeElem.setAttribute('ng-app', '');
      }
      nodeElem.querySelectorAll('*').forEach(el => {
        this.compile(el);
      });
    }
  };
  window.smallAngular = smallAngular;
})();