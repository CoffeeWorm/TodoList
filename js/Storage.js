'use stirct';
var storage = {
  __key: 'todo_list',
  __default: { maxSub: 0, data: [] },
  /*
   * localStorage 数据格式
   * {
   *     maxSub: ,
   *     ...,
   *     data:[{id:...},{},{}]
   *  }
   */
  set: function(arr) {
    arr = arr || [];
    var info = this.__getAll();
    info.data = arr;
    localStorage[this.__key] = JSON.stringify(info);
  },
  getMaxSub: function() {
    var info = this.__getAll();
    this.setMaxSub(info.maxSub + 1);
    return info.maxSub;
  },
  setMaxSub: function(maxSub) {
    if (maxSub === undefined) return;
    var info = this.__getAll();
    info.maxSub = maxSub;
    localStorage[this.__key] = JSON.stringify(info);
  },
  __getAll: function() {
    var tpl = JSON.stringify(this.__default);
    return JSON.parse(localStorage[this.__key] || tpl);
  }
};

/* Unit Test */
// storage.set();
// storage.set(1, { tiem: Date.now(), title: "abc", content: "..", comfirmed: true });
// console.log(storage.get(1));
//storage.remove(-1);
// console.log(storage.getMaxSub());
// storage.setMaxSub(3);
/* Test End */

export default storage;
