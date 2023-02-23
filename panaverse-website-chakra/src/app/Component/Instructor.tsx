import React from 'react'
import { Box, Container, Heading, Text, Flex, Center, SimpleGrid, Image } from '@chakra-ui/react'

export default function Instructor() {
    return (
        <Box>

            <Container maxW='1600px'>

                <Center> {/*Center is a layout component that centers its child within itself */}

                    <Heading pb='25px'>Our Instructors</Heading>
                </Center>

                <SimpleGrid minChildWidth='200px' pb='20px'>

                    <Box >
                        <Center>

                            <Image borderRadius='full' src='/zia.jpg' alt='Zia Khan' height='100px' width='100px' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image. */}

                        </Center>

                        <Heading pt='10px' textAlign='center'>Zia Khan</Heading>

                        <Text pt='5px' textAlign='center' px='20px'>
                            Mentor and software developer with 20+ years of expertise in cloud and serverless computing, software design, project
                            management, and API and App development
                        </Text>

                    </Box>

                    <Box >
                        <Center>

                            <Image borderRadius='full' src='/zia.jpg' alt='Zia Khan' height='100px' width='100x' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image. */}

                        </Center>

                        <Heading pt='10px' textAlign=' center'>Zia Khan</Heading>

                        <Text pt='5px' textAlign='center' px='20px'>
                            Mentor and software developer with 20+ years of expertise in cloud and serverless computing, software design, project
                            management, and API and App development
                        </Text>

                    </Box>

                    <Box>
                        <Center>

                            <Image borderRadius='full' src='/zia.jpg' alt='Zia Khan' height='100px' width='100px' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image. */}

                        </Center>

                        <Heading pt='10px' textAlign='center'>Zia Khan</Heading>

                        <Text pt='5px' textAlign='center' px='20px'>
                            Mentor and software developer with 20+ years of expertise in cloud and serverless computing, software design, project
                            management, and API and App development
                        </Text>

                    </Box>

                    <Box>
                        <Center>

                            <Image borderRadius='full' src='/zia.jpg' alt='Zia Khan' height='100px' width='100px' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image. */}

                        </Center>

                        <Heading pt='10px' textAlign='center'>Zia Khan</Heading>

                        <Text pt='5px' textAlign='center' px='20px'>
                            Mentor and software developer with 20+ years of expertise in cloud and serverless computing, software design, project
                            management, and API and App development
                        </Text>

                    </Box >

                    <Box>
                        <Center>

                            <Image borderRadius='full' src='/zia.jpg' alt='Zia Khan' height='100px' width='100px' />{/*Chakra Image Component not NextJs Image component
                            borderRadius 'full' will make round image. */}

                        </Center>

                        <Heading pt='10px' textAlign='center'>Zia Khan</Heading>

                        <Text pt='5px' textAlign=' center' px='20px'>
                            Mentor and software developer with 20 + years of expertise in cloud and serverless computing, software design, project
                            management, and API and App development
                        </Text >

                    </Box >
                </SimpleGrid >
            </Container >
        </Box >
    )
}
