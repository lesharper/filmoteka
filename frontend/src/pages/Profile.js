import React from 'react';
import UpdateProfile from "../components/Forms/UpdateProfile";
import Personal from "../components/Personal/Personal";

const Profile = () => {
    return (
        <div className="min-h-screen m-5 w-full bg-zinc-100">
            <Personal/>
            {/*<UpdateProfile/>*/}
        </div>
    );
}

export default Profile;