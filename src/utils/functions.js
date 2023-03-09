export function get_json(res) {
    if(!res.ok) throw Error(`网络错误 ${res.status} ${res.statusText}`);
    return (
        res
            .text()
            .then((t)=>{
                try {
                    return JSON.parse(t);
                } catch(e) {
                    console.error('json parse error');
                    console.trace(e);
                    console.log(t);
                    throw new SyntaxError('JSON Parse Error '+t.substr(0,50));
                }
            })
    );
}

export function request(method, url, body) {
    method = method.toUpperCase();

    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
        
    }
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ('Bearer' + localStorage.getItem('TOKEN')),
        },
        body: body
    }).then(get_json).then((json) => {
        if (json.code === 500) {

            localStorage.removeItem("TOKEN");
            return Promise.reject('Unauthorized');
        }
        return json;
    })
}