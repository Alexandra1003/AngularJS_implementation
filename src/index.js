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