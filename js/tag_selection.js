function replaceAt(source, replace, start, end) {
  return source.substring(0, start) + replace + source.substring(end);
}

jQuery(document).ready(function () {

  var syntaxElements = {
    'author' : 'author',
    'title': 'title',
    'date': 'date',
    'publisher' : 'publisher',
    'publoc': 'publisher location',
    'edition': 'edition',
    'other': 'other',
    'page': 'page number(s)',
    'volume': 'volume',
    'editor': 'editor'
  };
  var options = '';


  jQuery.each(syntaxElements, function(key, value) {
    options += '<option value="'+key+'">'+value+'</option>';
  });

  var checkbox = '<input type="checkbox" class="pull-left" id="refkeyedit"><span id="refkeylabel"> edit reference highlights</span><br>';
  var checkbox2 = '<input type="checkbox" class="pull-left" id="cleartags">clear tags<br>';

  var widget = '<br/><div id="refwidget"><label>Referencing Markup Widget</label><select id="refel">'+options+'</select><input type="text" name="elabel" id="elabel">'+checkbox+checkbox2+'</div>';
  jQuery('#edit-body').before(widget);
  var refeditable = false;
  jQuery('#refkeyedit').change( function(e) {
    refeditable = !refeditable;
    (refeditable)? jQuery('#refkeylabel').css('color', 'red') : jQuery('#refkeylabel').css('color', 'black');
  });
  var cleartags = false;
  jQuery('#cleartags').change( function() {
    cleartags = !cleartags;
    (cleartags)? jQuery('#refkeylabel').css('color', '#0099FF') : (refeditable)? jQuery('#refkeylabel').css('color', 'red') : jQuery('#refkeylabel').css('color', 'black');
  });
  jQuery('#refel').change( function() {
    refeditable = true;
    jQuery('#refkeyedit').prop('checked', true);
    jQuery('#refkeylabel').css('color', 'red');
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
          
          // untagged = untagged.replace(/\|[\w]*\]/g, '');
          untag = slicedText.replace(/\|[\w\?'’,.;:!\/\-&\(\) \|]*\]/g, '');
          console.log(untag);
          unbracket = untag.replace(/\[/g, '');
          console.log(unbracket);

          withouttags = replaceAt(jQuery(this).text(), unbracket, startIndex, endIndex);
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