


async function login(event) {
    event.preventDefault();
    const user = document.querySelectorAll('.form-control')
    const name = user[0].value
    const email = user[1].value
    const password = user[2].value
    const passwordConfirm = user[3].value
    fetch('http://localhost:3000/useres',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})}
    )
    .then(res => res.json())
    .then(json => {
        let newjson = JSON.stringify(json) 
        newjson
        console.log(json)
    })
}

document.querySelector('#register-form').addEventListener('submit', login)    