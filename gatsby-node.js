"use strict";

const date = require('date-and-time');

exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest
}, {
  formatAsDateString = true,
  formatting = {
    format: 'MM/DD/YYYY',
    utc: false
  },
  locale = null
}) => {
  const createNode = actions.createNode;

  if (locale) {
    require(`date-and-time/locale/${locale}`);

    date.locale(locale);
  }

  const buildDateData = {
    currentDate: formatAsDateString ? date.format(new Date(), formatting.format, formatting.utc) : new Date()
  };
  const buildDateNodeContent = JSON.stringify(buildDateData);
  const buildDateNodeMeta = {
    id: createNodeId(`current-build-date`),
    parent: null,
    children: [],
    internal: {
      type: `CurrentBuildDate`,
      mediaType: `text/html`,
      content: buildDateNodeContent,
      contentDigest: createContentDigest(buildDateData)
    }
  };
  const buildDateNode = Object.assign({}, buildDateData, buildDateNodeMeta);
  createNode(buildDateNode);
};