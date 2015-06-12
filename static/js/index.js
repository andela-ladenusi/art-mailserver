var inputs = {
        signature : document.querySelector('[data-signature-edit]'),
        message   : document.querySelector('[data-message-edit]'),
    },
    hidden = {
        signature : document.querySelector('[data-signature-hidden]'),
        message   : document.querySelector('[data-message-hidden]'),
    },
    displays = {
        signature : document.querySelector('[data-signature]'),
        message   : document.querySelector('[data-message]')
    },
    overlayTrigger = document.querySelector('[data-overlay-trigger]'),
    overlay = document.querySelector('[data-overlay]');

function init() {
    for (var key in inputs) {
        bindInput(key);
        update(key);
    }

    overlayTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.style.display = 'block';
    });
}

function bindInput(key) {
    inputs[key].addEventListener('keyup', function () {
        update(key);
    });
}

function render(val) {
    return val.split('\n').join('<br>');
}

function update(key) {
    var value = inputs[key].value;
    displays[key].innerHTML = render(value);
    hidden[key].value = value;
}

init();