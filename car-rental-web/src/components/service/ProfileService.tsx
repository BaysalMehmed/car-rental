import iProfile from "../model/iProfile";

export async function getProfile(): Promise<iProfile>{
    return await fetch("http://localhost:8080/profile").then(data => data.json())
}

export async function createProfile(profile : iProfile): Promise<iProfile>{
    console.log(profile)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    };
    return await fetch("http://localhost:8080/profile", requestOptions).then(data => data.json())
}