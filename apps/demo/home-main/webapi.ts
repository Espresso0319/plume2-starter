

   export default function init () {
    console.log("webapi init");

    getTopics2().then(d => console.log("data=>", d))
  }


   async function getTopics() {
    const res = await fetch('https://cnodejs.org/api/v1/topics')
    const json = await res.json();
    return json;
  }

   async function getTopics2() {
    return fetch('https://cnodejs.org/api/v1/topics')
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }

