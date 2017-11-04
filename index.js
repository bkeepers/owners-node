const minimatch = require('minimatch');

const FORMAT = /^\s*(@?[\w@\.\/-]+)\s*([\w\*\?\.\s\/-]+)*$/;

module.exports = function (contents) {
  const owners = [];

  contents.split('\n').forEach(line => {
    const match = FORMAT.exec(line);
    if (match) {
      owners.push(match.slice(1));
    }
  });

  return {
    for(path) {
      return owners.filter(([, globs]) => {
        return !globs || globs.split(' ').find(glob => minimatch(path, glob));
      }).map(([owner]) => owner);
    }
  };
};
