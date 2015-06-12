var mandrill = require('node-mandrill')('2a0fZX4MNBT6jCSitJZilw'),
    urlencode = require('urlencode');

exports.view = function (req, res) {
    res.render('index.html', {
        itemId    : req.params.itemId,
        message   : render(urlencode.decode(req.query.message)),
        signature : urlencode.decode(req.query.signature)
    });
};

function render(str) {
    return str.split('\n').join('<br>');
}

exports.edit = function (req, res) {
    res.render('edit.html', { itemId: req.params.itemId });
};

exports.send = function (req, res) {
    var email = req.body.email,
        message = req.body.message,
        signature = req.body.signature,
        itemId = req.params.itemId,
        url = 'http://localhost:7000/card/' + itemId + '/?message=' + urlencode(message) + '&signature=' + urlencode(signature);

    if (!email) {
        return res.status(400).send('Email required');
    }

    var emailObj = {
        from_email  : 'fathersday@kano.me',
        from_name   : 'Kano',
        to          : [ { email: email } ],
        subject     : 'My Father\'s Day card made with code!',
        text        : 'foobar',
        html        : 'Hi Dad,<br><br>Check out the <a href="' + url + '">father\'s day card</a> I\'ve made for you using code and Kano <a href="http://art.kano.me">Make Art</a>'
    };

    mandrill('/messages/send', { message: emailObj }, function (err) {

        if (err) {
            return res.status(403).send(err.message);
        }

        res.render('thanks.html');
    });
};