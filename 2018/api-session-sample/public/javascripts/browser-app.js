console.log('JS!');

function fetchData() {
    fetch('/api/items')
        .then(x => x.text())
        .then(x => document.writeln(x))
        .catch(err => document.writeln(err.toString()));
}

function fetchDataBasic() {
    const username = `user`;
    const password = `p@ssword:`
    const credentials = `${encodeURIComponent(username)}:${encodeURIComponent(password)}`;
    fetch('/api/items', {
        headers: {
            'Authorization': `Basic ${btoa(credentials)}`
        }
    })
        .then(x => x.text())
        .then(x => document.writeln(x))
        .catch(err => document.writeln(err.toString()));
}