'use client'

import React from 'react'
import { Box, Flex, Container, SimpleGrid, Heading, Text, Grid } from '@chakra-ui/react'
import Image from 'next/image'
import logo from '..//..//..//public/red-p-logo.png'
import Link from 'next/link'
import png from '../../../public/panaverse80_80.png'

export default function Footer() {
    return (
        <Box bg='black'>
            <Container maxW='1300px'>

                <SimpleGrid spacing='20px' gap='20px' py='60px' templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} textAlign={{ base: 'center', lg: 'left' }} >

                    {/*gridTemplateColumns is a CSS property that specifies the size of each column in a grid while templateColumns is a prop specific to SimpleGrid that allows
                    you to specify the number of columns at different breakpoints
                    If mobile screen, display 2 columns and 4 columns if laptop screen
                    All the items will be center aligned if small screen and left align if large screen */}

                    <Box color='gray' >

                        <Heading pb='20px' color='white'>About Us</Heading>

                        <Image src={png} alt='Panaverse' />

                        <Text pt='15px' pr={{ base: '0', lg: '50' }} >The Future of the Web is Web3.0, Metaverse, and Edge Computing. Panaverse DAO is a movement to spread these technologies globally. It
                            is community of Web3 abd Metaverse developers, designers, trainers, startup founders, and service providers.
                        </Text>

                    </Box>

                    <Box >

                        <Heading color='white'>Useful Links</Heading>

                        <Grid pt='40px' color='gray'>

                            <Link href='/'>Home</Link>

                            <Link href='/'>Syllabus</Link>

                            <Link href='/'>Explore</Link>

                            <Link href='/'>About</Link>

                            <Link href='/'>Contact</Link>

                        </Grid>
                    </Box>

                    <Box >
                        <Heading color='white'>Follow Us</Heading>

                        <Grid pt='40px' color='gray'>

                            <Link href='/'>Facebook</Link>

                            <Link href='/'>Linkedin</Link>

                            <Link href='/'>Twitter</Link>

                            <Link href='/'>Youtube</Link>

                            <Link href='/'>GitHub</Link>

                        </Grid>

                    </Box>

                    <Box>

                        <Heading color='white'>Contact Us</Heading>
                        <Grid pt='40px' color='gray'>
                            <Link href='/'>+92 123 4567890</Link>
                            <Link href='/'>abc@gmail.com</Link>
                            <Link href='/'>Karachi, Pakistan</Link>
                        </Grid>
                    </Box>

                </SimpleGrid>

            </Container>

        </Box>
    )
}
