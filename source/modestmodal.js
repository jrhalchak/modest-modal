// Modest Modal 1.0.0
// Jonathan Halchak, www.jrhalchak.com, @onlinebhero
// License: MIT - do whatever you want

;(function ( $, window, document, undefined ) {
  var _currentModals = [], modestmodalInitialized = false;

  $.modestmodal = $.modestmodal || function(options) {
      // ** means will allow override
      var self = this,
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
          positionX: '50%', // from left // **
          positionY:'60%', // from top // **
          modalStyles: {
            'display':'none',
            'position':'fixed',
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
          positionX: optionObject.positionX || defaults.positionX,
          positionY: optionObject.positionY || defaults.positionY,
          overlayBackground: optionObject.overlayBackground || defaults.overlayBackground,
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
        }, 300);
      }

      function bindClose(closeButton) {
        $('body').on('click', closeButton, function() {
            $.modestmodal.close();
        });
      }

      $.modestmodal.init = function() {
        defaults = $.extend({}, defaults, changeableProperties(options));

        bindClose(defaults.closeButton);

        $('body').on('click', defaults.openSelector, function() {
          var $this = $(this),
            customOptions = {
              type: $this.data('modestmodal-type') || defaults.type,
              content: $this.data('modestmodal-content') || defaults.content,
              modalClass: $this.data('modestmodal-modal-class') || defaults.modalClass,
              closeButton: $this.data('modestmodal-close-selector') || defaults.closeButton,
              transitionDuration: $this.data('modestmodal-transition-duration') || defaults.transitionDuration,
              positionX: $this.data('modestmodal-position-x') || defaults.positionX,
              positionY: $this.data('modestmodal-position-y') || defaults.positionY,
              overlayBackground: $this.data('modestmodal-overlay-background') || defaults.overlayBackground,
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
          $newModal = defaults.$modal.clone(),
          modalCount = _currentModals.length + 1,
          opts = $.extend({}, defaults, changeableProperties(customOptions)),
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
          .css({
            'z-index': (modalCount + opts.zIndex + 1),
            'top': opts.positionY,
            'left': opts.positionX
          });

        if(opts.type == 'content' || opts.type == 'html') {
          $newModal.html(opts.type == 'html' ? $(opts.content).html() : opts.content);
          pushAndAppendModals($newModal, $newOverlay);
        } else if (opts.type == 'ajax') {
          $.get(opts.content)
            .then(function(data) {
              $newModal.html(data);
              pushAndAppendModals($newModal, $newOverlay);
              if(typeof opts.ajaxCallback === 'function') opts.ajaxCallback();
            })
            .error(function() { console.log('modestmodal: Error with AJAX call.'); return; });
        }
      }

      $.modestmodal.close = function() {
        var $$lastOpen = _currentModals.pop();
        $$lastOpen.modal.css('opacity',0);
        $$lastOpen.overlay.css('opacity',0);
          setTimeout(function() {
            $$lastOpen.modal.remove()
            $$lastOpen.overlay.remove();
          }, 400);
      }
      $.modestmodal.destroy = function(){
          $('[id^=modestmodal-],[class^=modestmodal-]').remove();
          $.modestmodal.prototype.destroy.apply(this, arguments );
      }

      if(!modestmodalInitialized) {
        $.modestmodal.init();
        modestmodalInitialized = true;
      } else if (options) {
        defaults = $.extend({}, defaults, changeableProperties(options));
      }
    }
})( jQuery, window , document );
