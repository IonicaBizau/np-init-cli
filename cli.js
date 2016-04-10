#!/usr/bin/env node

"use strict";

const clp = require("clp")
    , pack = require("./package")
    , npInit = require("np-init")
    , path = require("path")
    ;

// Parse the command line arguments
var cliOpt = new clp.Option(["c", "cli"], "Pass this option if you are creating a cli package.")
  , hereOpt = new clp.Option(["H", "here"], "If passed, this will create the package files in the current directory.")
  , nameOpt = new clp.Option(["n", "name"], "The package name.", "name")
  , folderOpt = new clp.Option(["f", "folder"], "The package folder path.", "path")
  , descriptionOpt = new clp.Option(["d", "description"], "The package description.", "description")
  , templateOpt = new clp.Option(["t", "template"], "Set the template.", "template")
  , parser = new clp({
        name: "NPM Package Init"
      , description: pack.description
      , version: pack.version
      , exe: pack.name
      , examples: [
          , "$ np-init"
        ]
      , docs_url: pack.homepage
      , process: true
    }, [
        nameOpt
      , descriptionOpt
      , hereOpt
      , templateOpt
      , cliOpt
    ])
  ;

if (hereOpt.is_provided) {
    folderOpt.value = ".";
    nameOpt.value = nameOpt.value || path.basename(process.cwd());
} else {
    folderOpt.value = folderOpt.value || nameOpt.value;
}

npInit({
    name: nameOpt.value
  , description: descriptionOpt.value || ""
  , dirname: folderOpt.value
  , template: templateOpt.value || undefined
}, (err, data) => {
    console.log(err || data);
});
