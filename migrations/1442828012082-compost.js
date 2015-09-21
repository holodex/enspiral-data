var through = require('through2')

module.exports = function () {
  var ts = through.obj(function (input, enc, cb) {
    var output
    switch (input.type) {
      case 'groups':
      case 'people':
        input.value.agentType = 
        output = {
          key: input.key,
          type: 'agents',
          value: {
            agentType: (input.type === 'groups') ? 'group' : 'person',
            id: input.value.id,
            name: input.value.name,
            image: input.value.image,
          }
        }
        break
      case 'linkTypes':
        output = {
          key: input.key,
          type: 'relationshipTypes',
          value: {
            id: input.value.id,
            inverse: input.value.inverse,
            context: '',
            source: '',
            target: '',
            labels: input.value.labels,
            queryLabels: input.value.queryLabels,
            color: input.value.color
          }
        }
        break
      case 'relationships':
        output = {
          key: input.key,
          type: input.type,
          value: {
            id: input.value.id,
            context: input.value.context,
            source: input.value.source,
            relationshipType: input.value.link,
            target: input.value.target
          }
        }
        break
    }
    cb(null, output)
  })

  ts.push({
    key: "agent",
    type: "agentTypes",
    value: {
      id: 'agent',
      name: "Agent",
      subTypeOf: "http://xmlns.com/foaf/0.1/Agent",
      description: "A thing with agency."
    }
  })
  ts.push({
    key: "person",
    type: "agentTypes",
    value: {
      id: 'person',
      name: "Person",
      subTypeOf: "http://xmlns.com/foaf/0.1/Person",
      description: "A person."
    }
  })
  ts.push({
    key: "group",
    type: "agentTypes",
    value: {
      id: 'group',
      name: "Group",
      subTypeOf: "http://xmlns.com/foaf/0.1/Organization",
      description: "A group."
    }
  })

  return ts
}
