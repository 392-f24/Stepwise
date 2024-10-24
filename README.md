# React Vitest Template

A starter template for building React apps with Vite. Includes Vitest for unit testing and
a hefty .gitignore file.

# Requirements

Node 20 or greater.

## Usage

```
cd your-app-name
yarn
```
just control-C to exit then run ``yarn``.

## Test

Verify that the initial app works. Run

```
yarn start
```

and open the URL displayed.

Verify that the unit tests work with

```
yarn test
```

Two tests should run and pass. 

## Scripts

**package.json** defines the following scripts:

| Script           | Description                                         |
| -----------------| --------------------------------------------------- |
| yarn start        | Runs the app in the development mode.               |
| yarn run dev      | Runs the app in the development mode.               |
| yarn run build    | Builds the app for production to the `dist` folder. |
| yarn run serve    | Serves the production build from the `dist` folder. |
| yarn test         | Starts a Jest-like test loop                        |
| yarn run coverage | Runs the tests, displays code coverage results      |


## Git

If everything is working, set up [your local and remote repositories](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git).

## Folder Structure

```
your-app-name
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).


## License

This project is licensed under the terms of the [MIT license](./LICENSE).
