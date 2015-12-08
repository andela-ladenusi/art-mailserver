var mandrill = require('node-mandrill')('2a0fZX4MNBT6jCSitJZilw'),
    jade = require('jade'),
    urlencode = require('urlencode');

exports.send = function (req, res) {
    var data = req.body;

    if (!data.email) {
        return res.status(400).send('Email required');
    }

    var emailObj = {
        from_email  : data.user_email,
        from_name   : data.name,
        to          : [ { email: data.email } ],
        text        : 'foobar'
    };

    if (data.title && data.world_url && data.cover_url) {
        emailObj.subject = data.name + ' has sent you their latest creation, "' + data.title + '"';
        emailObj.html = jade.renderFile('views/template.jade', data);
    } else if (!data.title && !data.world_url && !data.cover_url) {
        emailObj.subject = data.name + ' has invited you to Make Art';
        emailObj.html = jade.renderFile('views/world-template.jade', data);
    }

    mandrill('/messages/send', { message: emailObj }, function (err) {

        if (err) {
            return res.status(403).send(err.message);
        }

        res.json({ response: 'Message has been sent to the recipient' });
    });
};