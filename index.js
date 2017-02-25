#!/usr/bin/env node

var program = require('commander')
var ncp = require('ncp').ncp

ncp.limit = 16

program
  .arguments('<command>')
  .option('-n, --name <service_name>', "The service's name")
  .action(function (command) {
    if (command === 'create-http-service') {
      console.log('creating http service with name: %s', program.name)

      ncp('./service-construction-pack', './test', function (err) {
        if (err) {
          return console.error(err)
        }
        console.log('done!');
        
      })
    }else {
      console.log("sorry couldn't recognise command")
    }
  })
  .parse(process.argv)
