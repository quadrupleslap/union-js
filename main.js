function Union(kinds) {
  var self = this;
  kinds.forEach(function (kind) {
    self[kind] = function () {
      return new Instance(kind, Array.from(arguments));
    };
  });
}

function Instance(kind, data) {
  this.kind = kind;
  this.data = data;
}

Instance.fromJSON = function (jsonObject) {
  return new Instance(jsonObject.kind, jsonObject.data);
}

Instance.prototype.match = function (clauses) {
  if (this.kind in clauses) {
    return clauses[this.kind].apply(undefined, this.data);
  } else if ('_' in clauses) {
    return clauses['_']();
  } else {
    throw new Error('Case not matched: ' + this.kind);
  }
}

Instance.prototype.toString = function () {
  return this.kind + '(' + this.data.join(', ') + ')';
}
