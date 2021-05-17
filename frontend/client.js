class Client {
    request(method, url, body, success, failure, before, after, crash) {
        const init = {
            method: method,
        };

        if (method === 'POST' || method === 'PUT') {
            if (typeof body === 'undefined') {
                throw new Error(`${method} request must have a body.`);
            }
            if (typeof body !== 'object') {
                throw new Error(`${method} body must be an object.`);
            }
            init.headers = new Headers();
            init.headers.append('Content-Type', 'application/json');
            init.body = JSON.stringify(body);
        }

        if (typeof success === 'undefined') {
            throw new Error('Request must have a success function.');
        }
        if (typeof failure === 'undefined') {
            throw new Error('Request must have a failure function.');
        }

        if (typeof before !== 'undefined') {
            before();
        }

        let handler;
        if (typeof crash === 'undefined') {
            handler = (error) => console.error(error);
        } else {
            handler = (error) => crash(error);
        }

        fetch(url, init)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(success)
                        .catch(handler);
                } else {
                    response.text()
                        .then(failure)
                        .catch(handler);
                }
            })
            .catch(handler)
            .finally(() => {
                if (typeof after !== 'undefined') {
                    after();
                }
            });
    }

    get(url, success, failure, before, after, crash) {
        this.request('GET', url, undefined, success, failure, before, after, crash);
    }

    post(url, body, success, failure, before, after, crash) {
        this.request('POST', url, body, success, failure, before, after, crash);
    }

    put(url, body, success, failure, before, after, crash) {
        this.request('PUT', url, body, success, failure, before, after, crash);
    }

    delete(url, success, failure, before, after, crash) {
        this.request('DELETE', url, undefined, success, failure, before, after, crash);
    }
}

const client = new Client();

export default client;
