// node_modules/.pnpm/vue3-click-away@1.2.4/node_modules/vue3-click-away/dist/module.js
var clickEventType = function() {
  return document.ontouchstart !== null ? "click" : "touchstart";
};
var UNIQUE_ID = "__vue_click_away__";
var onMounted = function(el, binding, vnode) {
  onUnmounted(el);
  let vm = vnode.context;
  let callback = binding.value;
  let nextTick = false;
  setTimeout(function() {
    nextTick = true;
  }, 0);
  el[UNIQUE_ID] = function(event) {
    if ((!el || !el.contains(event.target)) && callback && nextTick && typeof callback === "function") {
      return callback.call(vm, event);
    }
  };
  document.addEventListener(clickEventType(), el[UNIQUE_ID], false);
};
var onUnmounted = function(el) {
  document.removeEventListener(clickEventType(), el[UNIQUE_ID], false);
  delete el[UNIQUE_ID];
};
var onUpdated = function(el, binding, vnode) {
  if (binding.value === binding.oldValue) {
    return;
  }
  onMounted(el, binding, vnode);
};
var plugin = {
  install: function(app) {
    app.directive("click-away", directive);
  }
};
var directive = {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted
};
var mixin = {
  directives: {
    ClickAway: directive
  }
};
var module_default = plugin;
export {
  module_default as default,
  directive,
  mixin
};
//# sourceMappingURL=vue3-click-away.js.map
