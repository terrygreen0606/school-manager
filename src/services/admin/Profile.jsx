var globalVariables = require('../globalVariables');
export function Profile(userData)
{
    return new Promise((resolve, reject) => {
        let login_token = sessionStorage.getItem('login_token');
       // console.log(login_token);
        fetch(globalVariables.profile_api_path, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ login_token,
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