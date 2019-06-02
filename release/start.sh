sudo su

# Starting backend service
cd /usr/share/app/wedding-planner-finder/backend-app
rm /tmp/back-end-app.out
nohup npm start > /tmp/back-end-app.out 2>&1 &


# frontend app
cd /usr/share/app/wedding-planner-finder/backend-app
rm -rf node_modules/*
rm -rf node_modules/.bin/*
rm -rf node_modules/.cache/*
rm package-lock.json
npm install
npm run bundle