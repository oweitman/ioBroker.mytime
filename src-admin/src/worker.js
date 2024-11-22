import {} from /* RRule */ 'rrule';
// importScripts("rrule");

export default () => {
    /*     self.addEventListener('message', e => {
        // debugger;
        // self.importScripts("rrule.js");
        const rule = new RRule(e.data);
        // postMessage(rule.all());
    }); */
};

/* export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        let { users, type } = e.data;
  
        if(type === "asc") {
          users = users.sort((a, b) => a.commentCount - b.commentCount);
        } else {
          users = users.sort((a, b) => b.commentCount - a.commentCount);
        }
  
        postMessage(users);
    })
  } */
