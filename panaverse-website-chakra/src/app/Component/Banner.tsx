import React from 'react'

import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react'
import Image from 'next/image'
import VR from '../../../public/0220-extended-reality-explained-ar-vr-mixed-reality-technology-header-image-820x410.webp'
import Web3 from '../../../public/download.webp'
import Meta from '../../../public/images.jpg'

export default function Banner() {
    return (
        <> {/*Fragment used because only one parent element should be return while we are returning 3 parent element (3 boxes) */}

            <Box bgImage='https://img.freepik.com/free-vector/gradient-white-background-wavy-lines_79603-2167.jpg'> {/*Upper Box */}

                <Container maxW='1800px'>

                    <Flex gap={{ lg: '100px', base: '10px' }} display={{ lg: 'flex', base: 'grid' }} pt={{ base: '20px', lg: '150px' }}>
                        {/*If smaller screen, the padding top will be 40px otherwise it will 
                    be 150 px for largerscreen
                    If smaller screen, padding from x-axis will be 5px otherwise 40px for larger screen */}

                        <Box flexBasis='50%' px='40px'> {/*It is used to set intial main size of a flex item before free space is distributed according to the flexbox layout and specifies the size
                    of the content box of a flex item */}

                            <Heading size='2xl' >Prepare yourself for the Next Generation on Internet with Panaverse</Heading> {/*Size of font will be 2 xl */}

                            <Text pt='10px'>
                                One Year Program where you Earn as you Learn. Consolidating Web3.0, Metaverse, Aritificial Intelligence, IoT Technologies
                            </Text>

                            <Button mt='10px' colorScheme='telegram'>More Info</Button>

                        </Box >

                        <Box mt={{ base: '10px', lg: '-50px' }} flexBasis='50%'>

                            <Image layout='responsive' src={VR} alt='Virtual Reality' />

                        </Box>

                    </Flex>

                </Container>

            </Box>

            <Box> {/*Middle Box */}

                <Container maxW='1600px'>

                    <Flex Flex gap={{ lg: '100px', base: '10px' }} display={{ lg: 'flex', base: 'grid' }} pt={{ base: '20px', lg: '150px' }}>

                        <Box flexBasis='50%'>

                            <Image layout='responsive' src={Web3} alt='Metaverse' />

                        </Box>

                        <Box pt={{ base: '10px', lg: '50px' }} flexBasis='50%' px='40px'>

                            <Heading size='2xl' >Web 3.0</Heading>

                            <Text pt='10px' pr='50px'>
                                Web3 has the potential to change the internet as we know of forever. In the present version of Web, Web2.0, all the data is owned by tech giants.
                                However, in Web3.0, which is decentralised in nature, data is owned by the user itself and all the activity is visible to all members of the
                                organisation. Thus Web3 ensures privacy, security, and transparency. It is build on peer-to-peer networks of computers that communicate with
                                each other without middlemen
                            </Text>

                            <Button mt='10px' colorScheme='telegram'>Read More</Button>

                        </Box>

                    </Flex>

                </Container>

            </Box>

            <Box> {/*Last Box */}

                <Container maxW='1600px'>

                    <Flex Flex gap={{ lg: '100px', base: '10px' }} display={{ lg: 'flex', base: 'grid' }} pt={{ base: '20px', lg: '150px' }}>

                        <Box flexBasis='50%' px='40px'>

                            <Heading size='2xl' >Program of Studies</Heading>

                            <Text pt='10px' pr='50px'>
                                The curriculum is intended for beginners who want to learn software development from the ground up. It is going to be a fifteen- long hybrid
                                program that includes both onsite and online classes. It is divided into five quarters of 13 weeks each. The emphasis will be on hands-on-learning
                                by educating students to produce projects
                            </Text>

                            <Button mt='10px' colorScheme='telegram'>Read More</Button>

                        </Box>

                        <Box flexBasis='50%'>

                            <Image layout='responsive' src={Meta} alt='Metaverse' />

                        </Box>

                    </Flex>

                </Container>

            </Box>
        </>
    )
}
