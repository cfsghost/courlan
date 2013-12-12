courlan
=======

It provided a simple way to manage middleware for express web framework.

Usage
-

Install courlan via NPM:

    npm install courlan -g
    

Get Started
-

### First Step
---

Write a own middleware, then package it to be a courlan module in the specific directory you want.

__middlewares/login_required.js__
```js
module.exports = {
    name: 'LoginRequired',
    middleware: function(req, res, next) {

        // Checks whether user is logged on or not
        if (req.session.logined) {
            next();
            return;
        }
  
        // Forbidden
        res.status(404);
        res.send('404 Not Found');
        res.end();
    }
    
}
```

### Second Step
---

Load all middlewares with courlan when initializing express application.

__app.js__
```js
var express = require('express');
var courlan = require('courlan');

var app = express();

courlan(__dirname + '/middleware', function() {

    app.configure(function() {
        // Do stuffs
    });

    app.listen(8000);
});
```

### Final Step
---

Using your own middleware in anywhere.

```js
var Middleware = require('courlan');

app.get('/test', Middleware.LoginRequired, function(req, res) {

    res.end('Success');
});
```

License
-
Licensed under the MIT License

Authors
-
Copyright(c) 2013 Fred Chien <<cfsghost@gmail.com>>
