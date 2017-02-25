#!/usr/bin/env node

var program = require('commander')
var ncp = require('ncp').ncp
var mv = require('mv')
var replace = require('replace')
const getInstalledPath = require('get-installed-path')
var exec = require('child_process').exec,
  child

ncp.limit = 16

program
  .arguments('<command>')
  .option('-n, --name <service_name>', "The service's name")
  .action(function (command) {
    if (command === 'create-http-service') {
      console.log('creating http service with name: %s', program.name)

      const packLocation = getInstalledPath('fresco-development-tool-cli').then((path) => {
        path = path + '/service-construction-pack'

        ncp(path, './' + program.name , function (err) {
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

          process.chdir('./' + program.name)

          child = exec('npm install',
            function (error, stdout, stderr) {
              console.log('stdout: ' + stdout)
              console.log('stderr: ' + stderr)
              if (error !== null) {
                console.log('exec error: ' + error)
              }

              child = exec('npm run test',
                function (error, stdout, stderr) {
                  console.log('stdout: ' + stdout)
                  console.log('stderr: ' + stderr)
                  if (error !== null) {
                    console.log('exec error: ' + error)
                  }
                  console.log('done!')
                })
            })
        })
      })
    } else {
      console.log("sorry couldn't recognise command")
    }
  })
  .parse(process.argv)
