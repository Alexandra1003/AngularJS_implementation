(function() {
  const directives = {};

  function findInitialNode() {
    const arrOfAllNodes = Array.from(document.querySelectorAll('*'));

    return arrOfAllNodes.find(node => {
      return node.hasAttribute('ng-app');
    });
  }

  const smallAngular = {
    directive(name, callback) {
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function!');
      }

      directives[name] = callback;
      console.log(directives);
    },
    compile(node) {
      const attrs = [...node.attributes];
      const arrOfDirectives = [];

      attrs.forEach(nodeAttr => {
        const result = directives.find(directiveObj => {
          return nodeAttr.name === directiveObj.name;
        });

        if (result) {
          arrOfDirectives.push(result);
        }
      });

      arrOfDirectives.forEach(directiveObj => {
        directiveObj.callback(node);
      });
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

window.smallAngular.directive('ng-click', function() {console.log(111)});
window.smallAngular.directive('ng-init', function(node) {
  node.style.background = 'grey';
  console.log(222);
});
window.smallAngular.directive('ng-repeat', function() {console.log(333)});

//window.smallAngular.compile(document.querySelector('body'));