import { Card } from "@/components/card";
import Link from "next/link";

export default function Notifications() {
    return <>
        <Card>
            <div>
                Notifications
            </div>
            <Link className="p-1 text-center text-fuchsia-700" href="/dashboard/archived" >Navigate To Archived</Link>
        </Card>
    </>
}