'use client'

import React from 'react'
import Home from '../Component/Home'
import { Box, Heading, Text, Container, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import pres from '../../../public/President.jpg'
import dao from '../../../public/red-p-logo-text_dao_croped.png'
import zia from '../../../public/zia.jpg'
import Instructor from '../Component/Instructor'


export default function About_Page() {
    return (
        <>

            <Home title='About' src='https://thumbs.dreamstime.com/b/happy-creative-team-modern-office-business-startup-design-people-teamwork-concept-152300029.jpg' />

            <Box> {/*Top Box */}

                <Container maxW='1600px'>

                    <Flex gap={{ base: '30px', lg: '100px' }} display={{ lg: 'flex', base: 'grid' }}>

                        <Box m='auto' flexBasis='50%'>
                            <Image src={pres} alt='President of Pakistan' />

                        </Box>

                        <Box flexBasis='50%' mr={{ base: '20px', lg: '70px' }} mt='-40px' m='auto'>
                            <Heading pt={{ base: '30px', lg: '130px' }}>President of Pakistan Dr. Arif Alvi</Heading>

                            <Text mt='20px'>
                                Arif-ur-Rehman Alvi (Urdu: عارف الرحمان علوی; born 29 July 1949) is a Pakistani dentist and politician currently serving as the 13th President of
                                Pakistan, in office since 9 September 2018. He was a member of the National Assembly of Pakistan from June 2013 to May 2018 and again from August to
                                September 2018.
                            </Text>

                            <Text mt='20px'>
                                Alvi was a dentist before entering politics in 1979, when he joined Jamaat-e-Islami but he later on resigned from the party and founded the Pakistan
                                Tehreek-e-Insaf with former Pakistan cricket team captain and cricketer-turned-politician, Imran Khan in 1996.
                            </Text>

                            <Text mt='20px'>
                                A founding member of Pakistan Tehreek-i-Insaf (PTI), Alvi was elected as President of Pakistan on 4 September 2018 following the presidential elections.
                                Alvi was elected to the National Assembly, from a seat of Karachi in 2013 and was re-elected in 2018 and was nominated as a candidate for the
                                presidential election. He was elected as the 13th President of Pakistan after defeating Fazal-ur-Rehman and Aitzaz Ahsan, after which he resigned from the National Assembly and was sworn into
                                office on 9 September 2018, succeeding Mamnoon Hussain.
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Box pt={{ base: '0px', lg: '60px' }}> {/*Middle Box */}

                <Container maxW='1600px'>

                    <Flex gap={{ base: '30px', lg: '100px' }} display={{ lg: 'flex', base: 'grid' }}>

                        <Box flexBasis='50%' mr={{ base: '20px', lg: '70px' }} mt={{ base: '0px', lg: '-50px' }}>

                            <Heading pt={{ base: '30px', lg: '130px' }}>Panaverse DAO</Heading>

                            <Text mt='20px'>
                                The Future of the Web is Web 3.0, Metaverse, and Edge Computing. Panaverse DAO is a movement to spread these technolgies globally. It is community of
                                Web 3 and Metaverse developers, designers, trainers, startup founders and service providers.
                            </Text>

                        </Box>

                        <Box flexBasis='50%' m='auto'>
                            <Image src={dao} alt='Panaverse' />
                        </Box>
                    </Flex>
                </Container>
            </Box>


            <Box mt={{ base: '160px', lg: '60px' }} pb='50px'> {/*Last Box */}

                <Container maxW='1600px'>

                    <Flex gap={{ base: '30px', lg: '100px' }} display={{ lg: 'flex', base: 'grid' }}>

                        <Box m='auto' flexBasis='50%'>
                            <Image src={zia} alt='Panaverse DAO CEO' />

                        </Box>

                        <Box flexBasis='50%' mr={{ base: '20px', lg: '70px' }} mt='-40px'>
                            <Heading pt={{ base: '30px', lg: '130px' }}>Zia Khan</Heading>

                            <Text mt='20px'>
                                CEO of Panacloud, the world’s first Integrated API Ownership Economy, Crowdfunding, and Development Platform. Volunteer COO of PIAIC, an initiative by the President of
                                Pakistan for AI and computing mass education. Mentor and software developer with 20+ years of expertise in cloud and serverless computing, software design, project
                                management, and API and App development. Expert in concept, business modeling & strategy development for startups, specializing in DeFi and token economics. Mentored
                                and trained hundreds of thousands of developers. Triple masters degrees in business administration, engineering, and finance from Arizona State University. Master
                                in Economics from KU. Certified Public Accountant and Certified Management Accountant in USA.
                            </Text>

                            <Text mt='20px'>
                                Extensive experience in software architecture, design, development, implementation, and integration. Worked as a developer in Silicon Valley for 7 years. Hands-on work
                                including thousands of hours of development work logged recently resulting in multiple successful projects for cutting edge startups like Panacloud, OpenPD, Datasplash,
                                FreshAir Sensor, Tallyfy, Cloudspot, OnSeen, Unicharts, etc.
                            </Text>

                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Instructor />
        </>
    )
}
