import { useEffect, useState } from "react"
import iProfile from "../model/iProfile"
import { getProfile } from "../service/ProfileService"

export default function Profile(){

    const [profile, setProfile] = useState<iProfile>()

    useEffect(() => {
        getProfile().then((data) => setProfile(data))

    }, [])

    return <>{profile?.firstName}</>
}