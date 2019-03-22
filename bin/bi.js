#!/usr/bin/env node

const fs = require('fs')
const ora = require('ora')
const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const symbols = require('log-symbols')
const download = require('download-git-repo')
const templatePath = 'template/template.volt'
program
  .version('1.0.0', '-v, --version')
  .command('init <fileName> [configPath]')
  .action((fileName, configPath) => {
    if (fs.existsSync(fileName)) {
      console.log(symbols.error, chalk.red('项目已存在'))
      return
    }
    console.log(symbols.success, chalk.yellow('项目初始化开始...'))
    const spinner = ora('开始创建...')
    spinner.start()
    download('github:wozhangwan/bi-template', './', function(err) {
      // console.log(err ? 'Error' : 'Success')
      // const fileName = `${name}/package.json`;
      // console.log(fs.readFileSync(templatePath).toString())
      const content = fs.readFileSync('template.volt').toString()
      const configData = JSON.parse(fs.readFileSync(configPath).toString())
      handlebars.registerHelper('volt', function(context, options) {
        return new handlebars.SafeString('{{ ' + context + '}}')
      })

      const result = handlebars.compile(content)(configData)

      fs.writeFileSync(fileName, result)
      // const template = fs.readFileSync(templatePath).toString()
      // console.log(template)
      // fs.writeFileSync(fileName, `作者:${answers.author}  内容:${JSON.stringify(configData)}`)
      // test1.name="li"
      // var t = JSON.stringify(test1)
      // fs.writeFileSync('test1.json',t)
      spinner.succeed()
      console.log(chalk.green('项目名:'), fileName)
      console.log(symbols.success, chalk.green('项目创建成功'))
    })

    // inquirer.prompt([{
    //   type: 'input',
    //   name: 'author',
    //   message: '请输入作者名称'
    // }]).then((answers) => {

    // })
  })

program.parse(process.argv)
