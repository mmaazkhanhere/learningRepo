import React from 'react'
import Image from 'next/image'


type Props = {}

const Logo = (props: Props) => {
    return (
        <Image
            height={100}
            width={100}
            src='/logo.avif'
            alt='Logo'
        />
    )
}

export default Logo