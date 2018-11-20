console.log('JS!');

function fetchData() {
    fetch('/api/items')
        .then(x => x.text())
        .then(x => document.writeln(x))
        .catch(err => document.writeln(err.toString()));
}

function fetchDataBasic() {
    const credentials = `${'username'}:${'password'}`;
    fetch('/api/items', {
        headers: {
            'Authorization': `Basic ${btoa(credentials)}`
        }
    })
        .then(x => x.text())
        .then(x => document.writeln(x))
        .catch(err => document.writeln(err.toString()));
}