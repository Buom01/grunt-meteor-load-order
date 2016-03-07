var path = require("path");
var glob = require("glob");
var rimraf = require("rimraf");
var fs = require("fs");
var mkdirp = require("mkdirp");

eval((String)(fs.readFileSync("config.js")));

var helpers = {
  pathResolve: path.resolve,
  getFilename: path.basename,
  getAllFiles: glob.sync,
  deleteFolder: rimraf.sync,
  getExtension: function(filename) {
    return path.extname(filename).slice(1);
  },
  copyFile: function(source, dest) {
    var newFilename = source.replace(sourceFolder + "/", "").replace(/\/|\\/g, '-');
    var absoluteSource = path.join(path.resolve('.'), source);
    var absoluteDest = path.join(dest, newFilename);
    mkdirp.sync(dest);
    fs.createReadStream(absoluteSource).pipe(fs.createWriteStream(absoluteDest));
  }
};

var processFile = function(source) {
  var filename = helpers.getFilename(source);
  var ext = helpers.getExtension(source);
  return helpers.copyFile(source, helpers.pathResolve(targetFolder, String(getLoadOrderIndex(source, filename, ext)), getLocus(source, filename, ext)));
};



module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      options: {
        spawn: false,
        atBegin: true,
      },
      files: [sourceFolder+'/**'],
      tasks: ['process'],
    },
  });

  // Load plugins that provide tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('process', function() {
    helpers.deleteFolder(targetFolder);
    helpers.getAllFiles(sourceFolder + "/**/*.*").forEach(processFile);
  });

};
