const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '..', 'src/static/images/gallery'), (err, files) => {
  const gallery = [];

  files.forEach(file => {
    if (file.endsWith('.jpg')) {
      gallery.push(`/static/images/gallery/${file}`);
    }
  });

  fs.mkdirSync(path.join(__dirname, '..', 'dist/data'), { recursive: true });

  fs.writeFile(path.join(__dirname, '..', 'dist/data/gallery.json'), JSON.stringify(gallery), (err) => {
    if (err) throw err;
    console.log('dista/data/gallery.json has been saved');
  });
});
