'use strict';
import storage from "./Storage.js"
var Event = new Vue();

Vue.component("list", {
  template: "#task-tpl",
  props: ["todo"],
  methods: {
    action: function(name, id) {
      Event.$emit(name, id)
    }
  }
});

Vue.component("list-finish", {
  template: "#task-finish-tpl",
  props: ["todo"],
  methods: {
    action: function(name, id) {
      Event.$emit(name, id)
    }
  }
});

var app = new Vue({
  el: "#v-app",
  data: function() {
    return {
      /* { 
          id: number, 
          title: string, 
          content: string, 
          time: number,
          finish: boolean, 
          confirmed: boolean
      } */
      current: {
        id: -1,
        title: "",
        content: "",
        time: null,
        finish: false,
        confirmed: false
      },
      list: []
    };
  }(),
  methods: {
    merge: function() {
      var title = this.current.title;
      var id = this.current.id;
      //标题有内容，可以为0且id为默认的-1
      if (title && title !== 0) {
        if (id === -1) {
          var maxSub = storage.getMaxSub();
          this.current.id = maxSub || 0;
          this.list.push(Object.assign({}, this.current));
        } else {
          var sub = this.findIndex(id);
          this.list[sub] = Object.assign({}, this.current);
        }
      }
      this.reset();
    },
    remove: function(id) {
      var sub = this.findIndex(id);
      this.list.splice(sub, 1);
    },
    change: function(id) {
      var sub = this.findIndex(id);
      this.current = this.list[sub];
    },
    finishTrigger: function(id) {
      var sub = this.findIndex(id);
      this.list[sub].finish = !this.list[sub].finish;
    },
    findIndex: function(id) {
      var item = this.list.find(function(item) {
        return id === item.id;
      });
      return this.list.indexOf(item);
    },
    toggle: function(){
      var tmp = document.getElementsByClassName('more')[0];
      if (tmp.className === "more") {
        tmp.className = "more active";
      } else {
        tmp.className = "more";
      }
    },
    clear: function(){
      this.list = [];
    },
    reset: function(options) {
      var tpl = {
        id: -1,
        title: "",
        content: "",
        time: null,
        finish: false,
        confirmed: false
      };
      this.current = options || tpl;
    }
  },
  mounted: function() {
    this.list = storage.__getAll().data;
    Event.$on('remove', function(id) {
      if (id) {
        this.remove(id);
      }
    }.bind(this));
    Event.$on('change', function(id) {
      if (id) {
        this.change(id);
      }
    }.bind(this));
    Event.$on('finishTrigger', function(id) {
      if (id) {
        this.finishTrigger(id);
      }
    }.bind(this));
  },
  watch: {
    list: {
      deep: true,
      handler: function(newVal, oldVal) {
        storage.set(this.list);
      }
    }
  }
});