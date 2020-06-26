const mongoose = require('mongoose');

// Load models since we will not be instantiating our express server.
require('../app/models/Communication');

process.env.CONFIG_READY = 'true';
process.env.PROTOCOL = 'http';
process.env.ELASTICSEARCH_HOSTNAME = 'localhost';
process.env.ELASTICSEARCH_PORT = '8080';
