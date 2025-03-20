# devTinder-web

- create a vite + react application 
- install tailwind cssnpm install tailwindcss @tailwindcss/vite https://tailwindcss.com/docs/installation/using-vite
- install daisyUi npm i -D daisyui@latest https://daisyUI.com/ https://daisyui.com/docs/install/ https://daisyui.com/docs/install/vite/
- add narbar component from daisyui
- create NavBar.jsx
- install react router - npm install react-router-dom

Body 
    Nabar
    Route= / => Feed
    Route= /login => Login
    Route = /connections => Connections
    Route = /profile => Profile

- Create browserRouter > Routes > Route = /Body > RouteChildren
- Create an Outlet in your body component
- create a footer
- create a login page
- Install axios
- CORS - install cors in backend => add middleware to app with configurations: origin, credentials: true
- whenever you're making api call pass axios => { withCredentials: true }
- install redux toolkit https://redux-toolkit.js.org/tutorials/quick-start
- install react-redux + @reduxjs/toolkit
- configure store => Provider => createSlice => add reducer to store
- add redux devtools in chrome
- login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- refractor our code to add constants file + create a component folder and restructre files.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
