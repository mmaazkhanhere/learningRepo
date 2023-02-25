/* eslint-disable react/jsx-key */
'use client'

import React from 'react'
import Home from '../Component/Home'
import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { cards } from '../Component/database'

export default function Syllabus_page() {
    return (
        <>
            <Home title='Syllabus' src='https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/11/23173153/Current-Education-System-in-India.png' />

            <Box pt='30px'>
                <Container maxW='1600px'>
                    <Center flexDirection='column'>

                        <Heading size='2xl'>Course Syllabus</Heading>
                        <Text mt='20px' textAlign='center' px='130px' >
                            The first three quarters are shared by all specialities and are dedicated to studying Object-Oriented Programming and cutting-edge Full-Stack
                            Web 2.0 development. It is going to be a fifteeb month-long hybrid program that includes both onsite and online classes and is divided into five quarters
                            of 13 week each

                        </Text>
                    </Center>

                    <Center flexDirection='column' mt='20px'>
                        <Heading size='xl'>Common Courses</Heading>
                        <Text mt='20px' textAlign='center'>
                            Every student has to complete the following courses
                        </Text>
                    </Center>

                    <Center>

                        <Flex mt='30px' gap='20px'>

                            <Box textAlign='center' p='30px' boxShadow='dark-lg' borderRadius='20px' width='270px'>
                                <Heading>Quarter I</Heading>
                                <Text mt='30px'>CS-101: Object-Oriented Programming using TypeScript and TypeScript for React</Text>
                            </Box>

                            <Box textAlign='center' p='30px' boxShadow='dark-lg' borderRadius='20px' width='270px'>
                                <Heading>Quarter II</Heading>
                                <Text mt='30px'>W2-201: Developing Planet-Scale Web 2.0 Apps and APIs using Nextjs 13 and Cloud Development Kit (CDK) for Terraform</Text>
                            </Box>

                            <Box textAlign='center' p='30px' boxShadow='dark-lg' borderRadius='20px' width='270px'>
                                <Heading>Quarter III</Heading>
                                <Text mt='30px'>$- 101: Dollar Making Bootcamp Full-Stack Template and API Product Development</Text>
                            </Box>
                        </Flex>
                    </Center>
                </Container>


                <Container pt='30px' pb='20px' maxW='1600px' mt='50px' bgSize='cover' bgAttachment='fixed' bgImage='https://png.pngtree.com/thumb_back/fh260/background/20190831/pngtree-pastel-colorful-background-clouds-image_312444.jpg'>
                    {cards.map((elem) => (
                        <Box key={elem.id}>
                            <Center flexDir='column' mt='50px'>
                                <Heading size='xl' >{elem.heading_1}</Heading>
                                <Text mt='20px' textAlign='center' px='130px'>{elem.text_1}</Text>
                            </Center>

                            <Center>

                                <Flex mt='30px' gap='20px' >

                                    <Box bgColor='white' textAlign='center' p='50px' boxShadow='dark-lg' borderRadius='20px' width='300px'>
                                        <Heading>{elem.heading_2}</Heading>
                                        <Text mt='30px'>{elem.text_2}</Text>
                                    </Box>

                                    <Box bgColor='white' textAlign='center' p='50px' boxShadow='dark-lg' borderRadius='20px' width='300px'>
                                        <Heading>{elem.heading_3}</Heading>
                                        <Text mt='30px'>{elem.text_3}</Text>
                                    </Box>

                                </Flex>
                            </Center>
                        </Box>
                    ))}
                </Container>

            </Box>
        </>
    )
}
