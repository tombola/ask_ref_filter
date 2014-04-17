function preview_highlighting(output, success, request) {
  alert('preview_highlighting');
  if (success) jQuery('div#body-preview').html(output);
  else alert(output);
}

jQuery(document).ready(function () {
    alert('Preview inserted?');
    jQuery('#edit-body-und-0-value').before('<div id="body-preview" style="height: 50px; background-color: black;"><h1>HELLO</h1></div>')
    var body_textarea = jQuery('#edit-body-und-0-value').text();
    jQuery.ajaxMarkup(body_textarea, 'markdown', 'preview_highlighting');
});

