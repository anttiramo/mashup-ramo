var http = require('http');
var html = '';
var url = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.end(html);
}).listen (8181, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8181/');

console.log('Get list of books');
http.get(url, function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    console.log('Getting books finished');

    var bookList = JSON.parse(body).records;

    htmlContentList = bookList.map(function(d) {
      return '<h1>' + d.title + '</h1>' + '<p>' + d.year + '</p>';
    });

    html = '<body><html>\n'+htmlContentList.join('\n')+'\n</body></html>';
  });
  
}).on('error', function(e) {
  console.log('Error: ', e);
});