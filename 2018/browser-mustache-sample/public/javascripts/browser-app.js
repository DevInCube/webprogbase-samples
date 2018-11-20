console.log("Loading Browser JS app.js");

Promise.all([
    fetch("/templates/items.mst").then(x => x.text()),
    fetch("/api/items").then(x => x.json()),
])
    .then(([templateStr, itemsData]) => {
        console.log('templateStr', templateStr);
        console.log('itemsData', itemsData);
        const dataObject = {items: itemsData};
        const renderedHtmlStr = Mustache.render(templateStr, dataObject);
        return renderedHtmlStr;
    })
    .then(htmlStr => {
        console.log('htmlStr', htmlStr);
        const appEl = document.getElementById('app');
        appEl.innerHTML = htmlStr;
    })
    .catch(err => console.error(err));