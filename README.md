# datastream-app

This is a node application used for querying elasticsearch from the base system. To get it working, the `ELASTIC_PORT` configuration option needs to be changed in `config/config.js` to the port that elastic gets assigned to. To see this, run `docker stack ps datastream | grep es01` on the master-node to see what the port assignment is.

To start this application run:

`npm install`

`npm start`