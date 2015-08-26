# modest-modal
A less presumptuous modal plugin

<p>
  Modest modal is a jQuery plugin that makes as few styling presumptions as possible.  Technically I could've left out the overlay but good news, <em>you can override it</em>. Essentially it just centers a div on the page and fades an overlay into view.
</p>
<p>
  To see the default styles <a href="#" data-modestmodal data-modestmodal-type="content" data-modestmodal-content="Tada!">open the base modal</a>.
</p>
<p>
  This was inspired by uglipop.js but created for jQuery to allow for more plugin options and allow for stacking (and keeping track of) multiple modals.
</p>
<h2>Usage</h2>
<p>
  Include the <code>modestmodal.jquery.min.js</code> somewhere after your jquery include at the bottom of the body &ndash; or wherever your scripts are.
  <br />
  Then just call initialize the plugin <code>$.modestmodal()</code>.
</p>
```
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="compiled/modestmodal.jquery.js"></script>
<script>
  $.modestmodal()
</script>
```
<p>
  From there, you can manually call <code>$.modestmodal.open({options})</code> or add <code>data-modestmodal</code> to whatever element you want to trigger the modal (on click).
</p>
<h3>Options</h3>
```
{
  type: '', // 'ajax', 'html', or 'content'
  content: '', // 'url' when ajax, 'css-selector' when html, 'string' when content
  modalClass: '', // 'class' to add to modal on top of default class
  closeButton: '', // a 'selector' to apply the close button binding to
  transitionDuration: '', // '0.4s' or '400' override the transition length for fadeins
  positionX: '', // '50%', '500px', etc. Override the initial position FROM LEFT (for animation before it reaches 50%)
  positionY: '', // '50%', '500px', etc. Override the initial position FROM TOP (for animation before it reaches 50%)
  overlayBackground: '', // css background property values to override overlay – i.e. 'url(bg.jpg) top left no-repeat'
  disableEscape: Boolean, // passed in as true/false or checks existence of data attribute (with no value)
  uncloseable: Boolean, // passed in as true/false or checks existence of data attribute (with no value)
  ajaxCallback: function(){} // only works from code with function passed in
}
```
<h4>Element-Based Options</h4>
```
<a href="#"
    data-modestmodal
    data-modestmodal-type="" <!-- 'ajax', 'html', or 'content' -->
    data-modestmodal-content="" <!-- 'url' when ajax, 'css-selector' when html, 'string' when content -->
    data-modestmodal-modal-class="" <!-- 'class' to add to modal on top of default class -->
    data-modestmodal-close-selector="" <!-- a 'selector' to apply the close button binding to -->
    data-modestmodal-transition-duration="" <!-- '0.4s' or '400' override the transition length for fadeins -->
    data-modestmodal-position-x="" <!-- '50%', '500px', etc. Override the initial position FROM LEFT (for animation before it reaches 50%) -->
    data-modestmodal-position-y="" <!-- '50%', '500px', etc. Override the initial position FROM TOP (for animation before it reaches 50%) -->
    data-modestmodal-overlay-background="" <!-- css background property values to override overlay – i.e. 'url(bg.jpg) top left no-repeat' -->
    data-modestmodal-disable-escape <!-- use data attribute as a boolean (no value) -->
    data-modestmodal-uncloseable> <!-- use data attribute as a boolean (no value) -->

    Link to Modal</a>
```
<h3>Known Issues / Nice-to-haves</h3>
<ol>
  <li>
    Options passed on initialization are persistent when opening via method call (<code>$.modestmodal.open()</code>) but
    are ignored when calling a modal from data attributes on elements.
  </li>
  <li>
    Currently only accepts <code>#s</code> or <code>#.#s</code> notation for transition duration. Would be mice to add conversion to/from ms.
  </li>
</ol>
<strong>Having problems?</strong>
<p>
  Create an issue in git, pull-request, or fork it &mdash; or fork off ;).
</p>
