var http = require('http');

var actions = module.exports = {
    index: function() {
        this.render('./views/index.html');
    },
    createProject: function() {
        var req = this.request,
            res = this.response,
            self = this,
            entry = this.postData,
            couchOptions = {
                host: 'localhost',
                port: '5984',
                path: '/litmus',
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            entry['type'] = 'project';
        if (req.method === 'POST') {
                data = '',
                httpReq = http.request(couchOptions, function(res) {
                    res.on('data', function(chunk) {
                        data += chunk;
                    }).on('end', function() {
                        self.json(JSON.stringify(self.postData));
                    });
                }).on('error', function(e) {
                    console.log(e.message);
                    self.statusCode(500);
                });
            httpReq.write(JSON.stringify(entry));
            httpReq.end();
        } else {
            self.statusCode(405);
        }
    },
    allProjects: function() {
        var req = this.request,
            res = this.response,
            self = this,
            data = '',
            couchOptions = {
                host: 'localhost',
                port: '5984',
                path: '/litmus/_design/all/_view/projects',
            };
        if (req.method === 'GET') {
            var req = http.request(couchOptions, function(res) {
                res.on('data', function(chunk) {
                    data += chunk;
                }).on('end', function() {
                    var o = JSON.parse(data);
                    if (o['error']) {
                        throw 'db error: ' + o['error'];
                    } else {
                        self.json(o['rows']);
                    }
                });
            }).on('error', function(e) {
                console.log(e.message);
            });
            req.end();
        } else {
            self.statusCode(405); 
        }
    }
};
