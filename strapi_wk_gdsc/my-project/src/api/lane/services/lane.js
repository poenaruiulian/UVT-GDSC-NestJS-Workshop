'use strict';

/**
 * lane service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lane.lane');
