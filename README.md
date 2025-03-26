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
- you should not be able to access others routes without login
- if token is not present, redirect user to login page
- logout 
- profile page
- edit profile feature
- show toast message on save of profile
- new page - see all my connections
- new page - see all my connection requests
- feature - accept/reject connection request

- send/ ignore user card from feed
- signup new user
- e2e testing

# Deployment
- signup on aws
- create new account
- lanch an instance
- create key value pair
- modify pemissions after launching an instance chmod 400 "manveeraws-secret.pem"
- connect using below command - ssh -i pemfile machineThatWeAreAccessing e.g. ssh -i "manveeraws-secret.pem" ubuntu@ec2-13-60-206-62.eu-north-1.compute.amazonaws.com
- install node version 23.7.0
- git clone
frontend :
    - npm install -> installs all dependencies
    - npm run build
    - sudo apt update - update system dependencies
    - sudo apt install nginx - install 'engine X'
    - sudo systemctl start nginx - start 'engine X'
    - sudo systemctl enable nginx - makes 'engine X' up and running 
    - copy code from dist(bulld files) to /var/www/html i.e. sudo scp -r dist/* /var/www/html
    - enable port :80 on your aws instance
Backend
    - allowed ec2 instance public ip on mongodb server
    - installed npm install pm2 -g
    - pm2 start npm -- start
    - pm2 logs (command used to see pm2 logs)
    - pm2 flush npm (clear logs of application where app/process name is 'npm')
    - pm2 list  - list down all processes
    - pm2 stop <name> - stop that process with given name
    - pm2 delete <name> - deletes that process with given name
    - pm2 start npm --name "<name>" -- start (start process, and we can give any name here, that would be the process name)

- nginx config - /etc/nginx/sties-available/default
        server_name 13.60.206.62;
        location /api/ {
                proxy_pass http://localhost:3000/;  # Forward requests to your >
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
- restart nginx -> sudo systemctl restart nginx

# Adding a custom Domain name
- purchased domain name from godaddy
- signup on cloudflare and add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated
- DNS record: A record - devTinder.in -> 13.60.206.62
- enable SSL for website

# scheduling cron jobs in nodejs (backend project)
- install node-cron
- Learning about cron expressions syntax - crontab.guru
- Schedule a job
- install date-fns package
- Find all the unique emailId who have got connecction request in previous day
- send email
- explore queue mechanism to send bulk emails
- Amazon SES bulk emails
- Make sendEmail function dynamic
- bee-queue & bull npm packages to handle queue

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
