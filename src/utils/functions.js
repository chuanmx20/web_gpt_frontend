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
