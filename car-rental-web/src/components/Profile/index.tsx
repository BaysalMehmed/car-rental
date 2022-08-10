import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import iProfile from "../model/iProfile"
import { getProfile } from "../service/ProfileService"

export default function Profile(){

    const [profile, setProfile] = useState<iProfile>()

    const [searchParams, setSearchParams] = useSearchParams();
    
    let id = searchParams.get("id")
    if ( id === null) {
        id = "profile_64bc65f0-f77b-4313-8e99-bcee50da29ed"
    }

    useEffect(() => {
        getProfile(id!).then((data) => setProfile(data))

    }, [])

    return <>{profile?.firstName}</>
}