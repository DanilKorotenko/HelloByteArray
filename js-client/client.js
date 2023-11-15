import fetch from 'node-fetch';

const API_BYTE_ARRAY = "/byteArray";
const API_STRING = "/string";
const SERVICE_URL = "http://localhost:250";

function sendPostRequest(apiCall, data)
{
    return new Promise((resolve, reject) =>
        {
            let url = SERVICE_URL + apiCall;
            console.log("sendPostRequest with fetch: " + url);
            fetch(url,
            {
                method: "POST",
                body: data,
                mode: 'cors',
                headers:
                {
                    Accept: "application/json",
                    // "Content-type": "application/json; charset=utf-8",
                },
            })
            .then(result =>
            {
                if (result.status !== 200)
                {
                    reject(new Error("Agent error"));
                }
                else
                {
                    result.json()
                        .then(json =>
                        {
                            if (json)
                            {
                                resolve(json);
                            }
                            else
                            {
                                console.log("fetch empty json");
                                reject(new Error("Agent error"));
                            }
                        })
                        .catch(error =>
                        {
                            console.log("fetch json error");
                            reject(error);
                        });
                }
            })
            .catch(error =>
            {
                console.log("fetch error: " + JSON.stringify(error));
                reject(error);
            });
        });
}

console.log("client ready");

sendPostRequest(API_STRING, "Hello World!")
    .then(
        json => 
        {
            console.log("server response: "+JSON.stringify(json));
        })
    .catch(error => 
        {
            console.log("Fetch Error: " + error);
        });

console.log("client ready");
