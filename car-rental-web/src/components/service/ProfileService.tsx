import iProfile from "../model/iProfile";

export async function getProfile(): Promise<iProfile>{
    return await fetch("http://localhost:8080/profile").then(data => data.json())
}