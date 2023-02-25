import React from 'react'

import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react'
import Image from 'next/image'
import VR from '../../../public/0220-extended-reality-explained-ar-vr-mixed-reality-technology-header-image-820x410.webp'
import Web3 from '../../../public/download.webp'
import Meta from '../../../public/images.jpg'
import { RevealWrapper, RevealList } from 'next-reveal'

export default function Banner() {
    return (
        <> {/*Fragment used because only one parent element should be return while we are returning 3 parent element (3 boxes) */}

            <Box bgImage='https://img.freepik.com/free-vector/gradient-white-background-wavy-lines_79603-2167.jpg'> {/*Upper Box */}

                <RevealWrapper origin='left' delay={200} duration={1000} distance='500px' reset={true}> {/*You can animate single elements with RevealWrapper
                'origin' is used to define from which side we want to animate our content
                'delay' is the time before reveal animation begins
                'duration' controls how long animations take to complete
                'distance' controls how far elements move when revealed
                'reset' enables/disables elements returning to their intialised postion when the leave the viewport. When true, elements reveal each time they enter viewport
                instead of once */}

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

                                <Image src={VR} alt='Virtual Reality' />

                            </Box>

                        </Flex>

                    </Container>
                </RevealWrapper>
            </Box>

            <Box> {/*Middle Box */}

                <Container maxW='1600px'>

                    <Flex Flex gap={{ lg: '100px', base: '10px' }} display={{ lg: 'flex', base: 'grid' }} pt={{ base: '20px', lg: '150px' }}>

                        <Box flexBasis='50%'>

                            <RevealWrapper origin='right' delay={100} distance='400px' duration={1000} reset={true}>

                                <Image src={Web3} alt='Metaverse' />

                            </RevealWrapper>

                        </Box>

                        <Box pt={{ base: '10px', lg: '50px' }} flexBasis='50%' px='40px'>

                            <RevealWrapper interval={60} delay={500} origin='top' duration={2000} distance='500px' reset={true}  > {/*With reveal list, you can animate multiple 
                            elements which will result a sequence animation. First the heading will be animated, then text, and then button.
                            'interval' is the time between each reveal
                            'delay' is the time before reveal animation begins */}

                                <Heading size='2xl' >Web 3.0</Heading>

                                <Text pt='10px' pr='50px'>
                                    Web3 has the potential to change the internet as we know of forever. In the present version of Web, Web2.0, all the data is owned by tech giants.
                                    However, in Web3.0, which is decentralised in nature, data is owned by the user itself and all the activity is visible to all members of the
                                    organisation. Thus Web3 ensures privacy, security, and transparency. It is build on peer-to-peer networks of computers that communicate with
                                    each other without middlemen
                                </Text>

                                <Button mt='10px' colorScheme='telegram'>Read More</Button>

                            </RevealWrapper >
                        </Box>

                    </Flex>

                </Container>

            </Box>

            <Box> {/*Last Box */}

                <Container maxW='1600px'>

                    <Flex Flex gap={{ lg: '100px', base: '10px' }} display={{ lg: 'flex', base: 'grid' }} pt={{ base: '20px', lg: '150px' }}>


                        <Box flexBasis='50%' px='40px'>

                            <RevealWrapper origin='left' delay={200} duration={2000} distance='500px' reset={true} >
                                <Heading size='2xl' >Program of Studies</Heading>

                                <Text pt='10px' pr='50px'>
                                    The curriculum is intended for beginners who want to learn software development from the ground up. It is going to be a fifteen- long hybrid
                                    program that includes both onsite and online classes. It is divided into five quarters of 13 weeks each. The emphasis will be on hands-on-learning
                                    by educating students to produce projects
                                </Text>

                                <Button mt='10px' colorScheme='telegram'>Read More</Button>

                            </RevealWrapper>
                        </Box>

                        <Box flexBasis='50%'>

                            <RevealWrapper origin='right' delay={200} duration={2000} distance='400px' reset={true} >
                                <Image src={Meta} alt='Metaverse' />
                            </RevealWrapper>
                        </Box>


                    </Flex>

                </Container>

            </Box>
        </>
    )
}
