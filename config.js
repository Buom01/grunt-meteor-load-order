
/* This is a demo extracted of one of my project */


var targetFolder = "../_app";
var sourceFolder = "../private/app";

// Should return a number between 0 and 9.
var getLoadOrderIndex = function(filepath, filename, ext) {
  if(filename == "init.js")
    return 0;
  if(/init\-/.test(filename))
    return 1;
  if(/index/.test(filename))
    return 2;
  if(/utils/.test(filename) || /utils/.test(filepath)){
    return 3;
  }
  if(/stylesheets/.test(filepath) && !/stylesheets\/lib/.test(filepath)){
    return 8;
  }
  return 5;
};

// Should return 'client', 'server' or 'shared'.
var getLocus = function(filepath, filename, ext) {
  if(/server/.test(filepath)|| /\.s\./.test(filename)){
    return "server";
  }
  if(/client/.test(filepath) || /templates/.test(filepath) || /routes/.test(filepath) || /\.c\./.test(filename)){
    return "client";
  }
  return 'shared';
};
