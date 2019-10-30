export function Profile(userData)
{
    return new Promise((resolve, reject) => {
        let login_token = sessionStorage.getItem('login_token');
        fetch("http://partner-mlm.ti/api/admin/profile-api", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${login_token.token}`,
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