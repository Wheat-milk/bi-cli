#!/usr/bin/env node

console.log('BI-cli')
const fs = require('fs')
const ora = require('ora')
const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const symbols = require('log-symbols')
const download = require('download-git-repo')
const templatePath = 'template/template.volt'
console.log(templatePath)
program.version('1.0.0', '-v, --version')
  .command('init <fileName> [configPath]')
  .action((fileName, configPath) => {
    if (fs.existsSync(fileName)) {
      console.log(symbols.error, chalk.red('项目已存在'))
      return
    }
    console.log(symbols.success, chalk.yellow('项目初始化开始...'))
    download('github:Wheat-milk/bi-cli', 'template/template.volt', function (err) {
      console.log(err ? 'Error' : 'Success')
      console.log(fs.readFileSync(templatePath).toString())
    })
    inquirer.prompt([{
      type: 'input',
      name: 'author',
      message: '请输入作者名称'
    }]).then((answers) => {
      const spinner = ora('正在开始创建...')
      spinner.start()

      console.log(symbols.success, chalk.green('项目创建成功'))
      console.log(chalk.green('项目名:'), fileName)
      console.log(chalk.green('作者:'), answers.author)



      fs.readFile(configPath, 'utf8', function (err, data) {
        if (err) console.log(err)
        const configData = JSON.parse(data)
        console.log(configData)
        // const template = fs.readFileSync(templatePath).toString()
        // console.log(template)
        // fs.writeFileSync(fileName, `作者:${answers.author}  内容:${JSON.stringify(configData)}`)
        // test1.name="li"
        // var t = JSON.stringify(test1)
        // fs.writeFileSync('test1.json',t)
      });
      spinner.succeed()
    })
  })

program.parse(process.argv)