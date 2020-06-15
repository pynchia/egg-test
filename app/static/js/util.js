
const formToJSON = elements => [].reduce.call(elements, (data, el) => {
	data[el.name] = el.value;
	return data;
  }, {});

async function postData(url='', data={}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        mode: 'same-origin',
        body: JSON.stringify(data)
    });
    if (response.ok) { // HTTP-status is 200-299
        try {
            return await response.json();
        } catch(e) {
            console.log(`Error: HTTP POST ${uri} malformed JSON in response`, e);
        }
    } else {
        console.log(`Error: HTTP POST ${uri} response status ${response.status}`);
    }
}

async function getData(uri='') {
    const response = await fetch(uri);
    if (response.ok) { // HTTP-status is 200-299
        try {
            return await response.json();
        } catch(e) {
            console.log(`Error: HTTP GET ${uri} malformed JSON in response`, e);
        }
    } else {
        console.log(`Error: HTTP GET ${uri} response status ${response.status}`);
    }
}
