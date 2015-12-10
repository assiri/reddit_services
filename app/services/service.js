import Ember from 'ember';
var cache = {};
export default Ember.Service.extend({
  name:'service',
  find: function(name, id) {
    if (cache[name] && cache[name][id]) {
      return cache[name][id];
    }
    return Ember.$.getJSON("http://www.reddit.com/r/" + id + ".json")
      .then(function(result) {
        return result.data.children.map(function(c) {
          return {id: c.id,
                  title: c.data.title,
                  domain: c.data.domain,
                  url: c.data.url};
        });
      }).then(function(record) {
      cache[name] = cache[name] || {};
      cache[name][id] = record;
      return record;
    });
  }
});
