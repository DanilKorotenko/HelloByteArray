import fetch from 'node-fetch';

const API_BYTE_ARRAY = "/byteArray";
const API_STRING = "/string";
const SERVICE_URL = "http://localhost:250";

// https://developer.mozilla.org/en-US/docs/Web/API/fetch
// body can be:  Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal, 

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

let utf8Encode = new TextEncoder();
let byteArr = utf8Encode.encode("abc"); // Uint8Array [ 97, 98, 99 ]

sendPostRequest(API_BYTE_ARRAY, byteArr)
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

