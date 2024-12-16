import { Suspense } from "react";
import MyProfile from "@components/MyProfile";

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading profile...</div>}>
            <MyProfile />
        </Suspense>
    );
}