#!/usr/bin/env node

var program = require('commander')
var ncp = require('ncp').ncp
var mv = require('mv')
var replace = require('replace')

ncp.limit = 16

program
  .arguments('<command>')
  .option('-n, --name <service_name>', "The service's name")
  .action(function (command) {
    if (command === 'create-http-service') {
      console.log('creating http service with name: %s', program.name)

      ncp('./service-construction-pack', './' + program.name , function (err) {
        if (err) {
          return console.error(err)
        }
        mv('./' + program.name + '/SERVICE_NAME', './' + program.name + '/' + program.name , function (err) {})

        replace({
          regex: 'SERVICE_NAME',
          replacement: program.name,
          paths: ['./' + program.name],
          recursive: true,
          silent: true
        })

        console.log('done!')
      })
    }else {
      console.log("sorry couldn't recognise command")
    }
  })
  .parse(process.argv)
