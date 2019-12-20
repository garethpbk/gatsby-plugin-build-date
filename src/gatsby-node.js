exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  { formatAsDateString = true, options },
) => {
  const { createNode } = actions

  const buildDateData = {
    currentDate: formatAsDateString
      ? new Date().toLocaleDateString(options)
      : new Date(),
  }

  const buildDateNodeContent = JSON.stringify(buildDateData)

  const buildDateNodeMeta = {
    id: createNodeId(`current-build-date`),
    parent: null,
    children: [],
    internal: {
      type: `CurrentBuildDate`,
      mediaType: `text/html`,
      content: buildDateNodeContent,
      contentDigest: createContentDigest(buildDateData),
    },
  }

  const buildDateNode = Object.assign({}, buildDateData, buildDateNodeMeta)

  createNode(buildDateNode)
}
