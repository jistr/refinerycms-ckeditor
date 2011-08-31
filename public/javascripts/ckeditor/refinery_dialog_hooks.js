
var ckeditorRefineryHooks = {
  initialize: function () {
    href = window.location.href;

    if (href.match(/\/images\/insert/) && href.match(/ckeditor/i)) {
      this.initializeImageHooks();
    }

    // TODO: hooks for file browser and link browser
  },

  initializeImageHooks: function () {
    close_buttons = $('.close_dialog.button');
    submit_button = $('#existing_image_area .wymupdate.button');

    close_buttons.unbind();
    submit_button.unbind();

    close_buttons.click(this.closeImageDialog);
    submit_button.click(this.submitImageDialog);
  },

  closeImageDialog: function () {
    window.close();
  },

  submitImageDialog: function () {
    var button = $(this);
    var ckeditorFuncNum = getParamValue('CKEditorFuncNum');
    var parent = $('#existing_image_area');

    // size should be 'small', 'medium', etc.
    var size = parent.find('.image_dialog_size.selected').children('a').attr('data-size');
    var wants_resize = parent.find('#wants_to_resize_image:checked').length != 0;
    if (!wants_resize || size.length < 1) {
      size = 'original';
    }

    var selectedImage = parent.find('ul li.selected img');
    if (selectedImage.length == 0) {
      alert('Please pick an image.');
      return;
    }
    var imageUrl = selectedImage.attr('data-' + size);

    window.opener.CKEDITOR.tools.callFunction(ckeditorFuncNum, imageUrl);
    window.close();
  },

  newImageSubmit: function() {
  },
};

function getParamValue(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

$(document).ready(function() {
  ckeditorRefineryHooks.initialize();
});
