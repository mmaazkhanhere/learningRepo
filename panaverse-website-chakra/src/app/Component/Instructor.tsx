/* eslint-disable react/jsx-key */
import React from 'react'
import { Box, Container, Heading, Text, Flex, Center, SimpleGrid, Image } from '@chakra-ui/react'
import { data } from './database'

interface data {
    id: number,
    src: string,
    heading: string,
    text: string
}

export default function Instructor() {
    return (
        <Box>

            <Container maxW='1600px'>

                <Center> {/*Center is a layout component that centers its child within itself */}

                    <Heading pb='25px'>Our Instructors</Heading>
                </Center>

                <Flex flexDir='row'>

                    {data.map((ins: data) => /*map function is used on array of object that is recieved from the database. It is used to tidy our code as copying and pasting boxes 
                   will cluter the code and also increase its size*/
                        <Box >
                            <Center>

                                <Image borderRadius='full' src={ins.src} alt='Zia Khan' height='90px' width='90px' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image.
                            src component is recieved from the database file */}

                            </Center>

                            <Heading pt='10px' textAlign='center' size='md'>{ins.heading}</Heading> {/*heading is recieved from the database file */}

                            <Text size='sm' pt='5px' textAlign='center' px='20px'>
                                {ins.text}
                            </Text>

                        </Box>
                    )}
                </Flex >
            </Container >
        </Box >
    )
}
