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
  <pre><code>&lt;script src=&quot;https://code.jquery.com/jquery-1.11.3.min.js&quot;&gt;&lt;/script&gt;<br />&lt;script src=&quot;compiled/modestmodal.jquery.js&quot;&gt;&lt;/script&gt;<br /><br />&lt;script&gt;<br />    $.modestmodal()<br />&lt;/script&gt;</code></pre>
</p>
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
&lt;a href="#"
    data-modestmodal
    data-modestmodal-type="" &lt;!-- 'ajax', 'html', or 'content' --&gt;
    data-modestmodal-content="" &lt;!-- 'url' when ajax, 'css-selector' when html, 'string' when content --&gt;
    data-modestmodal-modal-class="" &lt;!-- 'class' to add to modal on top of default class --&gt;
    data-modestmodal-close-selector="" &lt;!-- a 'selector' to apply the close button binding to --&gt;
    data-modestmodal-transition-duration="" &lt;!-- '0.4s' or '400' override the transition length for fadeins --&gt;
    data-modestmodal-position-x="" &lt;!-- '50%', '500px', etc. Override the initial position FROM LEFT (for animation before it reaches 50%) --&gt;
    data-modestmodal-position-y="" &lt;!-- '50%', '500px', etc. Override the initial position FROM TOP (for animation before it reaches 50%) --&gt;
    data-modestmodal-overlay-background="" &lt;!-- css background property values to override overlay – i.e. 'url(bg.jpg) top left no-repeat' --&gt;
    data-modestmodal-disable-escape &lt;!-- passed in as true/false or checks existence of data attribute (with no value) --&gt;
    data-modestmodal-uncloseable&gt; &lt;!-- passed in as true/false or checks existence of data attribute (with no value) --&gt;

    Link to Modal&lt/a&gt;
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
