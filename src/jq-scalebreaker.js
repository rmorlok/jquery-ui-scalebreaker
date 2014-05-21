// Generated by CoffeeScript 1.3.3
(function() {

  (function($) {
    return $.widget("salsita.scalebreaker", {
      options: {
        cssAnimated: true,
        dialogContent: '',
        idNamespace: 'jq-scalebreaker',
        dialogPosition: 'bottom',
        closeOnBackdrop: true,
        denyUserScroll: true,
        debug: false
      },
      _create: function() {
        this.rawElement = "<div id='" + this.options.idNamespace + "-wrapper'>          <div id='" + this.options.idNamespace + "-dialog-scalable'>            <div id='" + this.options.idNamespace + "-dialog-scrollable'>              <div id='" + this.options.idNamespace + "-dialog-content'></div>              <span id='" + this.options.idNamespace + "-dialog-close'></span>            </div>          </div>        </div>";
        this.scrollbar = null;
        this.wrapper = null;
        this.dialog = null;
        this.scrollarea = null;
        this.content = null;
        this.close = null;
        this.fullPageHeight = null;
        this.scaleFactor = null;
        this.currentViewportOffset = null;
        return this._initWidget();
      },
      _initWidget: function() {
        $('body').append(this.rawElement);
        this.wrapper = $('#' + this.options.idNamespace + '-wrapper');
        this.dialog = $('#' + this.options.idNamespace + '-dialog-scalable');
        this.scrollarea = $('#' + this.options.idNamespace + '-dialog-scrollable');
        this.content = $('#' + this.options.idNamespace + '-dialog-content');
        this.close = $('#' + this.options.idNamespace + '-dialog-close');
        this._setInitialViewport();
        return this.changeDialogContent(this.options.dialogContent);
      },
      _setInitialViewport: function() {
        this.fullPageHeight = Math.max(document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        return this.wrapper.css({
          'height': this.fullPageHeight
        });
      },
      _getCurrentViewport: function() {
        this.scaleFactor = window.innerWidth / document.documentElement.clientWidth;
        this._logMessage('scale factor', this.scaleFactor);
        this.currentViewportOffset = [window.pageXOffset, window.pageYOffset];
        return this._logMessage('current viewport offset', this.currentViewportOffset);
      },
      _rescaleAndReposition: function() {
        this.dialog.css({
          'left': this.currentViewportOffset[0],
          'transform': "scale(" + this.scaleFactor + ")",
          '-webkit-transform': "scale(" + this.scaleFactor + ")"
        });
        if (this.options.dialogPosition === 'top') {
          this.dialog.css({
            'top': this.currentViewportOffset[1],
            'transform-origin': '0 0',
            '-webkit-transform-origin': '0 0'
          });
        }
        if (this.options.dialogPosition === 'bottom') {
          return this.dialog.css({
            'bottom': this.fullPageHeight - (this.currentViewportOffset[1] + window.innerHeight),
            'transform-origin': '0 100%',
            '-webkit-transform-origin': '0 100%'
          });
        }
      },
      _createScrollbar: function() {
        return this.scrollbar = new IScroll(this.scrollarea.get(0), {
          HWCompositing: false
        });
      },
      _logMessage: function(name, args) {
        if (this.options.debug) {
          return console.log("" + this.options.idNamespace + ": " + name, args);
        }
      },
      refresh: function() {
        this._getCurrentViewport();
        return this._rescaleAndReposition();
      },
      show: function() {
        var _self;
        _self = this;
        if (this.options.closeOnBackdrop) {
          _self.wrapper.on("click." + this.options.idNamespace, function(e) {
            if (e.target === _self.wrapper.get(0) || e.target === _self.dialog.get(0)) {
              return _self.hide();
            }
          });
        }
        this.close.one("click." + this.options.idNamespace, function(e) {
          e.stopPropagation();
          return _self.hide();
        });
        if (this.options.denyUserScroll) {
          $('body').on("touchmove." + this.options.idNamespace, function(e) {
            return e.preventDefault();
          });
        }
        this.wrapper.addClass("" + this.options.idNamespace + "-show");
        this.refresh();
        if (this.options.cssAnimated) {
          this.wrapper.addClass("" + this.options.idNamespace + "-animate-in");
          this.wrapper.on('animationend webkitAnimationEnd', function(e) {
            if (e.target === _self.scrollarea.get(0)) {
              _self.wrapper.removeClass("" + _self.options.idNamespace + "-animate-in");
              return _self.wrapper.off('animationend webkitAnimationEnd');
            }
          });
        }
        this._logMessage('showing widget');
        return this._createScrollbar();
      },
      hide: function() {
        var _self;
        _self = this;
        if (this.options.denyUserScroll) {
          $('body').off("touchmove." + this.options.idNamespace);
        }
        if (this.options.closeOnBackdrop && this.options.cssAnimated) {
          _self.wrapper.off("click." + this.options.idNamespace);
          this.wrapper.addClass("" + this.options.idNamespace + "-animate-out");
          this.wrapper.on('animationend webkitAnimationEnd', function(e) {
            if (e.target === _self.scrollarea.get(0)) {
              _self.wrapper.removeClass("" + _self.options.idNamespace + "-animate-out");
              _self.wrapper.removeClass("" + _self.options.idNamespace + "-show");
              _self.dialog.removeAttr('style');
              return _self.wrapper.off('animationend webkitAnimationEnd');
            }
          });
        } else if (this.options.closeOnBackdrop) {
          _self.wrapper.off("click." + this.options.idNamespace);
          this.wrapper.removeClass("" + this.options.idNamespace + "-show");
          this.dialog.removeAttr('style');
        }
        return this._logMessage('hiding widget');
      },
      changeDialogContent: function(content) {
        this.content.html(content);
        return this._logMessage('adding content to dialog', content);
      },
      destroy: function() {
        this.wrapper.remove();
        this.rawElement = null;
        this.wrapper = null;
        this.dialog = null;
        this.scaleFactor = null;
        this.initialViewport = null;
        this.currentViewportOffset = null;
        return this._destroy();
      },
      _destroy: $.noop
    });
  })(jQuery);

}).call(this);
