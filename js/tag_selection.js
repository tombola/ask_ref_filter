function replaceAt(source, replace, start, end) {
  return source.substring(0, start) + replace + source.substring(end);
}

jQuery(document).ready(function () {

  var syntaxElements = {
    'auth' : 'author',
    'title': 'title',
    'date': 'date',
    'pub' : 'publisher',
    'publoc': 'publisher location',
    'edition': 'edition',
    'misc': 'other',
    'page': 'page number(s)',
    'volume': 'volume',
    'editor': 'editor'
  };
  var options = '';


  jQuery.each(syntaxElements, function(key, value) {
    options += '<option value="'+value+'">'+value+'</option>';
  });

  var checkbox = '<input type="checkbox" class="pull-left" id="refkeyedit">edit reference highlights<br>';
  var checkbox2 = '<input type="checkbox" class="pull-left" id="cleartags">clear tags<br>';

  var widget = '<br/><div id="refwidget"><label>Referencing Markup Widget</label><select id="refel">'+options+'</select><input type="text" name="elabel" id="elabel">'+checkbox+checkbox2+'</div>';
  jQuery('#edit-body').before(widget);
  var refeditable = false;
  jQuery('#refkeyedit').change( function() {
    refeditable = !refeditable;
  });
  var cleartags = false;
  jQuery('#cleartags').change( function() {
    cleartags = !cleartags;
  });
  jQuery('#refel').change( function() {
    refeditable = true;
    jQuery('#refkeyedit').prop('checked', true);
    cleartags = false;
    jQuery('#cleartags').prop('checked', false);
  });

  var element = 'author';
  var elabel = '';
  jQuery('textarea').mouseup(function() {
      mouseDown=false;

      if (refeditable) {
        var startIndex = jQuery(this)[0].selectionStart;
        var endIndex = jQuery(this)[0].selectionEnd;
        var slicedText = jQuery(this).text().slice(startIndex, endIndex);

        if (cleartags) {
          untagged = slicedText.replace('[', '');
          // untagged = untagged.replace(/\|[\w]*\]/g, '');
          untagged = untagged.replace(/\|[\w\?'’,.;:!\/\-&\(\) \|]*\]/g, '');
          
          
          withouttags = replaceAt(jQuery(this).text(), untagged, startIndex, endIndex);
          jQuery(this).html(withouttags);
        }
        else {
          element = jQuery('#refel').val();
          el = jQuery('#elabel').val();
          elabel = (el != '') ? '|'+el : '';

          taggedText = '[' + slicedText + '|'+element+elabel+']';
          withtags = replaceAt(jQuery(this).text(), taggedText, startIndex, endIndex);

          jQuery(this).html(withtags);
        }
      }
  });

});