# modest-modal
A less presumptuous modal plugin

<p>
  Modest modal is a jQuery plugin that makes as few styling presumptions as possible.  Technically I could've left out the overlay but good news, <em>you can override it</em>. Essentially it just centers a div on the page and fades an overlay into view.
</p>
<p>
  To see the default styles and other examples - <a href="http://jrhalchak.github.io/modest-modal/">visit the pages site</a>.
</p>
<p>
  This was inspired by uglipop.js but created for jQuery to allow for more plugin options and allow for stacking (and keeping track of) multiple modals. It currently uses CSS3 transitions for the animation so they will only work on browsers that support transitions.
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
  transitionDuration: '', // '0.4s' override the transition length for fadeins
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
    data-modestmodal-transition-duration="" <!-- '0.4s' override the transition length for fadeins -->
    data-modestmodal-position-x="" <!-- '50%', '500px', etc. Override the initial position FROM LEFT (for animation before it reaches 50%) -->
    data-modestmodal-position-y="" <!-- '50%', '500px', etc. Override the initial position FROM TOP (for animation before it reaches 50%) -->
    data-modestmodal-overlay-background="" <!-- css background property values to override overlay – i.e. 'url(bg.jpg) top left no-repeat' -->
    data-modestmodal-disable-escape <!-- use data attribute as a boolean (no value) -->
    data-modestmodal-uncloseable> <!-- use data attribute as a boolean (no value) -->

    Link to Modal</a>
```
<h4>Methods</h4>
 <dl>
   <dt><code>$.modestmodal.open({options})</code></dt>
   <dd>Will open a new modal based on the options object passed in</dd>
   <dt><code>$.modestmodal.getOpenModals()</code></dt>
   <dd>
     Returns an array of objects with the modals and overlays currently open in the order they were opened.
     <br /><br />
     The objects returned are
 ```
 {
   modal: $(), //jQuery object referencing the modal element
   overlay: $() //jQuery object referencing the overlay element
 }
 ```
   </dd>
   <dt><code>$.modestmodal.close(optional index)</code></dt>
   <dd>
     Will close the last open modal by default. Accepts an optional index to close/remove (it uses the same array as <code>getOpenModals</code>). If the index is invalid, it reverts to closing the last open.
   </dd>
   <dt><code>$.modestmodal.destroy()</code></dt>
   <dd>
     Removes the modest modal plugin and removes any residual elements.<br />
     <strong>Note</strong>: this removes any elements who's <code>id</code> or <code>class</code> starts with &ldquo;modestmodal-&rdquo;
   </dd>
 </dl>
 <h4>Custom Events</h4>
 <dl>
   <dt><code>mm.beforeOpen</code></dt>
   <dd>Fires before the modal or overlay are added to the DOM and shown.</dd>
   <dt><code>mm.open</code></dt>
   <dd>Fires after element has been added and given full opacity (may happen before CSS transitions)</dd>
   <dt><code>mm.beforeClose</code></dt>
   <dd>Fires as soon as the <code>close</code> method is called</dd>
   <dt><code>mm.close</code></dt>
   <dd>Fires after modal and overlay are close and have been removed (if applicable)</dd>
 </dl>
 <h3>Versions</h3>
 <dl>
   <dt>1.0.3</d1>
   <dd>
     <ul class="u-noListPadding">
       <li>Adds custom events to modal. Can be used with type=HTML or with subscribed to through event bubbling.</li>
       <li>Duplicates modal when HTML is used so it knows not to remove it on close.</li>
       <li>Adds index option to close method.</li>
     </ul>
   </dd>
   <dt>1.0.0</d1>
   <dd>Initial commit</dd>
 </dl>
<h3>Known Issues / Idea Board</h3>
<ol>
  <li>
    Options passed on initialization are persistent when opening via method call (<code>$.modestmodal.open()</code>) but
    are ignored when calling a modal from data attributes on elements.
  </li>
  <li>
    Currently only accepts <code>#s</code> or <code>#.#s</code> notation for transition duration. Would be mice to add conversion to/from ms.
  </li>
  <li>
    Currently only works in IE9+. <strong>TODO</strong>: Change translate -50% to negative margins in a child div.
  </li>
  <li>
    Add absolute vs fixed positioning (potentially disable body scroll?)
  </li>
  <li>
    Doesn't account for browser window height and doesn't allow scrolling (to top or botttom of modal container).  Will either need a max-height in the code or adding &ldquo;meta&rdquo; scrolling of the modal.  The may be something that is just offset to the user's CSS styles to handle.
  </li>
</ol>
<strong>Having problems?</strong>
<p>
  Create an issue in git, pull-request, or fork it &mdash; or fork off ;).
</p>
