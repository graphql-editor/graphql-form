## Table of contents
* [Getting started](#getting-started)
* [Envs](#envs)
* [Add Tailwind-Css-Components](#add-tailwind-css-components)
* [Concepts](#concepts)
* [Added Library](#added-library)

# Getting started

this is **aexol-nextjjs-starter**
Best nextjs setup if you are starting a new project 

Download the repo

```sh
npm i
```

Run your develop environment

```sh
npm run dev
```

```sh
localhost:3000/
```

# Envs

Create Your own .env.development and .env.production files in root folder to define environment variables for development and production in this format:

```sh
NEXT_PUBLIC_HOST=https://somegraphqlbackend.com/graphql
```

# Add Tailwind-Css-Components

1. Install tailwindcss and its peer dependencies: 
    ```sh
    npm install -D tailwindcss postcss autoprefixer
    ```
2. Run the init command to generate both `tailwind.config.js` and `postcss.config.js`: 
    ```sh
    npx tailwindcss init -p
    ```

3. Configure `tailwind.config.js` file: 
```sh
module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
```
4. Add the Tailwind directives to `./styles/global.css`:
```sh
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Install `tailwind-styled-components`:
    ```sh
    npm i tailwind-styled-components
    ```

6. Now you can use tailwind-styled-components:
    ```sh
    import tw from 'tailwind-styled-components';
    ```
    ```sh
    <H1>Tailwind Styled Component!</H1>
    ```
    ```sh
    const H1 = tw.h1`
    text-xl
    text-green-500
    `;
    ```

# Concepts

This repo boilerplate uses: 
- NextJs ^12
- TypeScript
- Emotion
- Zeus

# Added Library:

1. @emotion/css - https://github.com/emotion-js/emotion
