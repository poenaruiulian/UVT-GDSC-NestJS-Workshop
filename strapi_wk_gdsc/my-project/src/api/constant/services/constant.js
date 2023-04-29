'use strict';

/**
 * constant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::constant.constant');
