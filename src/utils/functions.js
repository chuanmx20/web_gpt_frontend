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

export async function request(method, url, body) {
    method = method.toUpperCase();

    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
        
    }
    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('TOKEN') || 'undefined',
        },
        body: body
    });
    const json = await get_json(res);
    if (json.status_code === 403 || json.status_code == 401) {

        localStorage.removeItem("TOKEN");
        console.log(`error: ${json.data}`);
    }
    return json;
}