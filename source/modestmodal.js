// Modest Modal 1.0.4
// Jonathan Halchak, www.jrhalchak.com, @onlinebhero
// License: MIT - do whatever you want

;(function ( $, window, document, undefined ) {

  $.modestmodal = $.modestmodal || function(options) {
      var _currentModals = [], modestmodalInitialized = false, self = this,

      // ** means will allow override
      defaults = {
        $modal: $('<div class="modestmodal-modal" />'),
        $overlay: $('<div class="modestmodal-overlay" />'),
        closeButton: '.modestmodal-close', // **
        openSelector: '[data-modestmodal]', // **
        type: null, // **
        content: '', // **
        modalClass: '', // **
        zIndex: 99900,
        transitionDuration: '0.4s', // **
        transitionProperty: {
            '-webkit-transition': 'all 0.4s ease',
            '-moz-transition': 'all 0.4s ease',
            'transition': 'all 0.4s ease;'
        },
        left: '50%', // from left // **
        top:'60%', // from top // **
        modalStyles: {
          'display':'none',
          '-webkit-transform': 'translate(-50%, -50%)',
          '-ms-transform': 'translate(-50%, -50%)',
          'transform': 'translate(-50%, -50%)',
          'opacity':0
        },
        overlayStyles: {
          'visibility':'hidden',
          'position':'fixed',
          'top':0,
          'bottom':0,
          'left':0,
          'right':0,
          'opacity':0,
          'width':'100%',
          'height':'100%',
          'background-color':'black',
        },
        overlayBackground: 'rgba(0,0,0,0.3)', //**
        position: 'fixed', //**
        uncloseable: false, //**
        disableEscape: false, //**
        ajaxCallback: null //**
      };

      function changeableProperties(optionObject) {
        if(!optionObject) return {};
        return {
          type: optionObject.type || defaults.type,
          content: optionObject.content || defaults.content,
          closeButton: optionObject.closeButton || defaults.closeButton,
          openSelector: optionObject.openSelector || defaults.openSelector,
          modalClass: optionObject.modalClass || defaults.modalClass,
          transitionDuration: optionObject.transitionDuration || defaults.transitionDuration,
          left: optionObject.left || defaults.left,
          top: optionObject.top || defaults.top,
          overlayBackground: optionObject.overlayBackground || defaults.overlayBackground,
          position: optionObject.position || defaults.position,
          disableEscape: typeof optionObject.disableEscape !== 'undefined' ? optionObject.disableEscape : defaults.disableEscape,
          uncloseable: typeof optionObject.uncloseable !== 'undefined' ? optionObject.uncloseable : defaults.uncloseable
        }
      }

      function pushAndAppendModals($newModal, $newOverlay) {
        _currentModals.push({
          modal: $newModal,
          overlay: $newOverlay
        });

        $newModal.appendTo('body').css('display','block');
        $newOverlay.appendTo('body').css('visibility','visible');
        setTimeout(function() {
          $newOverlay.css('opacity',1).on('click',function() {
            if(!$(this).hasClass('uncloseable'))
              $.modestmodal.close();
          });
          $newModal.css({'opacity':1,'top':'50%'});
          $newModal.trigger('mm.open');
        }, 300);
      }

      function bindClose(closeButton) {
        $('body').off('click', closeButton).on('click', closeButton, function() {
            $.modestmodal.close();
        });
      }

      function modestmodalInit() {
        defaults = $.extend({}, defaults, changeableProperties(options));

        $('body').on('click', defaults.openSelector, function() {
          var $this = $(this),
            customOptions = {
              type: $this.data('modestmodal-type') || defaults.type,
              content: $this.data('modestmodal-content') || defaults.content,
              modalClass: $this.data('modestmodal-modal-class') || defaults.modalClass,
              closeButton: $this.data('modestmodal-close-selector') || defaults.closeButton,
              transitionDuration: $this.data('modestmodal-transition-duration') || defaults.transitionDuration,
              left: $this.data('modestmodal-left') || defaults.left,
              top: $this.data('modestmodal-top') || defaults.top,
              overlayBackground: $this.data('modestmodal-overlay-background') || defaults.overlayBackground,
              position: $this.data('modestmodal-position') || defaults.position,
              disableEscape: typeof $this.attr('data-modestmodal-disable-escape') !== 'undefined' ? true : false,
              uncloseable: typeof $this.attr('data-modestmodal-uncloseable') !== 'undefined' ? true : false
            };

          if(customOptions.closeButton !== defaults.closeButton) bindClose(customOptions.closeButton);
          $.modestmodal.open(customOptions);
        }).on('keyup', function(e) {
          var $latestOverlay = _currentModals.length > 0 ? _currentModals[_currentModals.length - 1].overlay : null;
          if (e.which == 27 && $latestOverlay && !$latestOverlay.hasClass('disableEscape')) $.modestmodal.close();
        });
      }

      $.modestmodal.open = function(customOptions){
        var $newOverlay = defaults.$overlay.clone(),
          modalCount = _currentModals.length + 1,
          opts = $.extend({}, defaults, changeableProperties(customOptions)),
          $newModal = opts.type == 'html' ? $(opts.content).data('doNotRemove', true) : defaults.$modal.clone(),
          completeOverlayStyles = opts.overlayStyles;

        if (!opts.type) return false;

        // TODO: check transitionduration for int or string
        if (opts.transitionDuration !== defaults.transitionDuration) {
          opts.transitionProperty = {
            '-webkit-transition': 'all ' + opts.transitionDuration + 'ease',
            '-moz-transition': 'all ' + opts.transitionDuration + 'ease',
            'transition': 'all ' + opts.transitionDuration + 'ease',
          }
        }

        completeOverlayStyles.background = opts.overlayBackground;

        $newOverlay.attr('id', 'modestmodal-overlay-' + modalCount)
          .css(completeOverlayStyles)
          .css(opts.transitionProperty)
          .css('z-index', (modalCount + opts.zIndex));

        if(opts.uncloseable) $newOverlay.addClass('uncloseable');
        if(opts.disableEscape) $newOverlay.addClass('disableEscape');

        $newModal
          .addClass(opts.modalClass)
          .attr('id', 'modestmodal-modal-' + modalCount)
          .css(opts.modalStyles)
          .css(opts.transitionProperty)
          .css('position', opts.position)
          .css({
            'z-index': (modalCount + opts.zIndex + 1),
            'top': opts.top,
            'left': opts.left
          });
        $newModal.trigger('mm.beforeOpen');

        if(opts.type == 'content' || opts.type == 'html') {
          if(opts.type == 'content') $newModal.html(opts.content);
          pushAndAppendModals($newModal, $newOverlay);
        } else if (opts.type == 'ajax') {
          $.get(opts.content)
            .then(function(data) {
              $newModal.html(data);
              pushAndAppendModals($newModal, $newOverlay);
              if(typeof opts.ajaxCallback === 'function') opts.ajaxCallback();
            })
            .fail(function() { console.log('modestmodal: Error with AJAX call.'); return; });
        }

        if (opts.closeButton !== defaults.closeButton) bindClose(customOptions.closeButton);
      }

      $.modestmodal.getOpenModals = function() {
        return _currentModals;
      }

      $.modestmodal.close = function(modalIndex) {
        var $$lastOpen;

        if(!_currentModals.length) {
          return false;
        } else {
          $$lastOpen = modalIndex && modalIndex < _currentModals.length ? _currentModals.splice(modalIndex, 1)[0] : _currentModals.pop();
        }

        $($$lastOpen.modal).trigger('mm.beforeClose', [$$lastOpen.modal, $$lastOpen.overlay]);
        $$lastOpen.modal.css('opacity',0);
        $$lastOpen.overlay.css('opacity',0);
          setTimeout(function() {
            $$lastOpen.modal.hide();
            $$lastOpen.overlay.hide();
            $($$lastOpen.modal).trigger('mm.close');
            if(!$$lastOpen.modal.data('doNotRemove')) $$lastOpen.modal.remove()
            $$lastOpen.overlay.remove();
          }, 400);
      }

      $.modestmodal.destroy = function(){
          $('[id^=modestmodal-],[class^=modestmodal-]').remove();
          $.modestmodal.prototype.destroy.apply(this, arguments );
      }

      if(!modestmodalInitialized) {
        modestmodalInit();
        modestmodalInitialized = true;
      } else if (options) {
        defaults = $.extend({}, defaults, changeableProperties(options));
      }
    }
})( jQuery, window , document );
