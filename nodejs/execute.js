// Adapted by Simone Basso from the node.js documentation

/*jslint node: true */

"use strict";

var child_process = require("child_process");
var fs = require("fs");

fs.lstat(".git", function (error, stats) {

    //
    // Either it's ENOENT (no such file or directory), or we
    // don't know how to repair the error.
    //
    if (error !== null && error.code === "ENOENT") {
        //
        // Perhaphs obvious, but, while here, better to add reminder: exec()
        // on a server is good *as long as* the user cannot control the string
        // that is passed to exec().
        //
        child_process.exec("git init", function (error, stdout, stderr) {
            //
            // Note: this function is invoked after the command exited,
            // therefore, stdout is what the program wrote on its stdout
            //
            if (error) {
                console.log("git init: %s", error);
                process.exit(1);
            }
            console.log("%s", stdout.trim());
        });
        process.exit(0);
    } else if (error !== null) {
        console.warn("unexpected error: %s", error);
        process.exit(1);
    }

    //
    // XXX: for correctness, here we should make sure that `.git'
    // is indeed a directory (in particular, we should ensure that
    // `.git' is not a symbolic linl -- which is why we used the
    // lstat(2) in the first place).
    //

    child_process.exec("git status", function (error, stdout, stderr) {
        if (error) {
            console.log("git status: %s", error);
            process.exit(1);
        }
        console.log("%s", stdout.trim());
    });

});
