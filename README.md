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

| Command  | Parameter         | description                               | example                      |
| -------- | ----------------- | ----------------------------------------- | ---------------------------- |
| use      | \<Template Name\> | initialize the project using the template | gen use @tmplates/vanilla    |
| init     | [directory-name]  | custom project template                   | gen init [directory-name]    |
| ls       | /                 | list installed templates                  | gen ls                       |
| outdated | /                 | check for outdated templates              | gen outdated                 |
| rm       | \<Template Name\> | remove a template file                    | gen rm @tmplates/vanilla     |
| update   | \<Template Name\> | update a template file                    | gen update @tmplates/vanilla |
