var globalVariables = require('../globalVariables');
export function Login(userData)
{
    return new Promise((resolve, reject) => {
        fetch(globalVariables.admin_api_path+"/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });
}
