import StudentLayout from '@/components/layout/StudentLayout';;
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Zakaa',
    description: 'Zakaa the learning platform',
}

export default function RootLayout({
    main
}: {
    main: React.ReactNode
}) {

    return (
        <>
            <StudentLayout children={main} />
        </>
    )
}
