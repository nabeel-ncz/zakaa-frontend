import UpdateAnnouncement from "@/components/user/insturctor/announcement/UpdateAnnouncement";

export default function page({ params }: { params: { id: string } }) {
    return (
        <UpdateAnnouncement params={params} />
    )
}
