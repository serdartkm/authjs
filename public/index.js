import { a as E, b as h } from './chunk-578ecc3d.js';

import('./chunk-62d0c1fa.js').then(function (_ref) {
  var ChatRoom = _ref["default"];
  E(h("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 70
    }
  }, h("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, h("h3", null, "SocketIO text messaging demo")), h(ChatRoom, null)), document.getElementById('root'));
});
