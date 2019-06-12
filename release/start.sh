sudo su
export NODE_ENV=staging

cd /usr/share/app/wedding-planner-finder/
git pull

# Starting backend service
cd /usr/share/app/wedding-planner-finder/backend-app
rm -rf node_modules/*
rm -rf node_modules/.bin/*
rm -rf node_modules/.cache/*
rm -f package-lock.json
cd /usr/share/app/wedding-planner-finder/backend-app
git pull
npm install
cd /usr/share/app/wedding-planner-finder/backend-app
git pull
ps -ef | grep 'node ./bin/www' | kill -9 `awk '{print $2}'`
rm -f /tmp/back-end-app.out
export NODE_ENV=staging
nohup npm start > /tmp/back-end-app.out 2>&1 &


# frontend app
cd /usr/share/app/wedding-planner-finder/web-app
rm -rf node_modules/*
rm -rf node_modules/.bin/*
rm -rf node_modules/.cache/*
rm -f package-lock.json
cd /usr/share/app/wedding-planner-finder/web-app
git pull
npm install
cd /usr/share/app/wedding-planner-finder/web-app
npm run bundle


