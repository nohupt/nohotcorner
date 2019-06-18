/* -*- mode: js; js-basic-offset: 4; indent-tabs-mode: nil -*- */

const Clutter = imports.gi.Clutter;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;

const AltTab = imports.ui.altTab;
const Main = imports.ui.main;
const WindowManager = imports.ui.windowManager;


let _id;

function _disable_hot_corners() {
  // Disables all hot corners
  Main.layoutManager.hotCorners.forEach(function(hot_corner) {
    if (!hot_corner) {
      return;
    }

    hot_corner._toggleOverview = function() {};
    hot_corner._pressureBarrier._trigger = function() {};
  });
}

function init() {
}

function enable() {
  _disable_hot_corners();
  // Hot corners may be re-created afterwards (for example, If there's a monitor change).
  // So we catch all changes.
  _id = Main.layoutManager.connect('hot-corners-changed', _disable_hot_corners);
}

function disable() {
  // Disconnects the callback and re-creates the hot corners
  Main.layoutManager.disconnect(_id);
  Main.layoutManager._updateHotCorners();
}
