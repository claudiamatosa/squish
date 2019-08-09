const fs = require('fs');
const path = require('path');
const probe = require('probe-image-size');

fs.readdir(path.join(__dirname, '..', 'dist/static/images/gallery'), (err, files) => {
  const gallery = [];

  files.forEach((file, index) => {
    if (file.endsWith('.jpg')) {
      const filePath = `/static/images/gallery/${file}`;
      const data = fs.readFileSync(path.join(__dirname, '..', 'dist', filePath));
      const { width, height } = probe.sync(data);

      gallery.push({
        id: index * 4,
        path: filePath,
        width,
        height
      });
    }
  });

  fs.mkdirSync(path.join(__dirname, '..', 'dist/data'), { recursive: true });

  fs.writeFile(path.join(__dirname, '..', 'dist/data/gallery.json'), JSON.stringify(gallery), (err) => {
    if (err) throw err;
    console.log('dist/data/gallery.json has been saved');
  });
});
