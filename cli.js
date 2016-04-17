#!/usr/bin/env node

"use strict";

const Tilda = require("tilda")
    , npInit = require("np-init")
    , path = require("path")
    ;

new Tilda(`${__dirname}/package.json`, {
    args: [{
        name: "name"
      , desc: "The package name."
      , type: String
    }, {
        name: "description"
      , desc: "The package description."
      , type: String
    }]
  , options: [
        {
            opts: ["c", "cli"]
          , desc:  "Pass this option if you are creating a cli package."
        }
      , {
            opts: ["f", "folder"]
          , desc: "The package folder path."
          , name: "path"
          , type: String
        }
      , {
            opts: ["t", "template"]
          , desc: "Set the template."
          , name: "template"
          , type: String
        }
    ]
}).main(action => {

    let name = action.args.name
      , desc = action.args.description
      , folderOpt = action.options.folder
      ;

    folderOpt.value = folderOpt.value || name;

    npInit({
        name: name
      , description: desc || ""
      , dirname: folderOpt.value
      , template: action.options.template.value || undefined
    }, (err, data) => action.exit(err || `Created the module in ${folderOpt.value}`));
});
