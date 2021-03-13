import $ from "jquery"

class AlertDialog2 {
  show(title, message) {
    // console.log($('body'));
    $('body').append(`
      <div id="modal-close-default"  class="uk-modal" style="display: block" uk-modal>
          <div class="uk-modal-dialog ">
              <div class="uk-modal-header">
                  <h2 class="uk-modal-title">${title}</h2>
              </div>
              <div class="uk-modal-body">
                  <p>${message}</p>
              </div>
              <div class="uk-modal-footer uk-text-right">
                  <button class="uk-button uk-button-default uk-modal-close uikit-close-btn" type="button">Close</button>
              </div>
          </div>
      </div>`
    );
    // $('#modal-close-default').modal();
    setTimeout(() => $('#modal-close-default').addClass("uk-open"), 100);

    $('.uikit-close-btn').on('click', function (e) {
      setTimeout(() => $('#modal-close-default').remove(), 200);
    });
  }
}

const alertDialog2 = new AlertDialog2;

export default alertDialog2;