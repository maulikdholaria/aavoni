#!/bin/sh
deactivate
cd /usr/share/app/aavoni/backend-app/
source venv/bin/activate
cd /usr/share/app/aavoni/backend-app/jobs
export NODE_ENV=production
python distribute_planners_leads.py