"use client"

import { useRouter } from "next/navigation"

import { Button } from '@/components/ui/button'

export default function NotFound() {
    const router = useRouter()
    return (
        <main className='w-full min-h-dvh flex flex-col items-center justify-center bg-black text-white gap-4'>
            <h2 className='text-xl md:text-3xl lg:text-5xl font-bold'>Not Found</h2>
            <p className='md:text-lg font-medium'>Could not find the requested page.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
        </main>
    )
}