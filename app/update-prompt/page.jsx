import { Suspense } from "react";
import updatePrompt from "@components/UpdatePrompt";

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading profile...</div>}>
            <updatePrompt />
        </Suspense>
    );
}