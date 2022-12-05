# Genrate

Genrate can help you quickly start modern web application project with a variety of built-in project templates.

## Installation

Installing Genrate requires Node.js 14+, and either Yarn or npm.

```bash
npm i genrate -g
```

## Getting Started

Run the following command to start the process. Substitute `[directory-name]` with the directory name you wish to create for this project.

```
gen use @tmplates/node [directory-name]
```

or

```
mkdir <directory-name>
cd <directory-name>
gen use @tmplates/node
```

The `@tmplates/node` above can be replaced with other project templates.

## Project Templates

Depending on the type of project, genrate create different flavors of project structures and uses different compilation and testing suites.

The supported project type are:

| Project Type | Template Name                                            |
| ------------ | -------------------------------------------------------- |
| Node         | [@tmplates/node](https://github.com/tmplates/node)       |
| Vanilla      | [@tmplates/vanilla](https://github.com/tmplates/vanilla) |
| Vue          | @tmplates/vue                                            |
| React        | @tmplates/react                                          |
| Electron     | @tmplates/electron                                       |
| Nest         | @tmplates/nest                                           |

## Commands

Below are the various genrate commands for manage locally template package.

| Command  | Parameters                         | description                                      | example                                    |
| -------- | ---------------------------------- | ------------------------------------------------ | ------------------------------------------ |
| use      | \<Template Name\> [directory-name] | initialize the project using the template        | gen use @tmplates/vanilla [directory-name] |
| init     | [directory-name]                   | initialize the project using the custom template | gen init [directory-name]                  |
| ls       | /                                  | list installed templates                         | gen ls                                     |
| outdated | /                                  | check for outdated templates                     | gen outdated                               |
| rm       | \<Template Name\>                  | remove a template file                           | gen rm @tmplates/vanilla                   |
| update   | \<Template Name\>                  | update a template file                           | gen update @tmplates/vanilla               |

## Create Project Template

Genrate supports custom template packages, just create a template package project as agreement and publish it to npm.

A legal template package includes `README.md`, `package.json` and template entry file (etc: `index.js` `template.js`).

The template entry file needs to be specified in the `package.json` file using the template field, below is the added tempalte field schema:

```js
"template": {
  "main": "index.js", // required
  "preprepare": "preprepare.js", // not required
  "postprepare": "postprepare.js" // not required
}
```

- `mian` The main field specifies the template entry file. the file must export a JSON object or a function that returns JSON object and the JSON object must satisfy the [template config](#about-template-config-fields) definition.
- `preprepare` It's a life cycle hook that is executed before parsing the main field, you can do something inside this hook and return a JSON object that matches the [ProjectStruct](https://github.com/2046/genrate/blob/main/types/index.d.ts#L34-L39) definition.
- `postprepare` It's a life cycle hook that is executed after parsing the main field, you can do something inside this hook and return a JSON object that matches the [ProjectStruct](https://github.com/2046/genrate/blob/main/types/index.d.ts#L34-L39) definition.

For more examples, you can refer to [Project Templates](#project-templates).

#### About Template Config Fields

```js
{
  ts?: boolean // Whether to use ts language
  lib?: boolean // Whether to create a library project
  dirs?: Array<string> // create some folders, etc: ['src', 'tests', 'plugins']
  files?: Array<Array<string>> // create some files, etc: [['src/index.ts', ''], ['test/index.spce.js', '']]
  framework?: 'vanilla' | 'vue' | 'react' | 'electron' | 'nest' // Use a web framework, vanilla indicates that no framework is used
  lint?: Array<'stylelint' | 'eslint' | 'commitlint'> // Use lint tools, support stylelint, eslint and commitlint, Where stylelint used to unify code styles
  vscode?: Array<string> // Recommended of VScode plugins, need to fill in plugin ID, etc: ['vue.volar', 'mikestead.dotenv']
  test?: boolean // Whether to use unit tests
  e2e?: boolean // Whether to use End-to-End test solution
}
```

## License

[MIT](LICENSE).
