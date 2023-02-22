import React from 'react'

import { Box, Flex, Heading, Text, Container, Button } from '@chakra-ui/react'
import Image from 'next/image'
import VR from '../../../public/0220-extended-reality-explained-ar-vr-mixed-reality-technology-header-image-820x410.webp'

export default function Banner() {
    return (
        <Box bg='gray.200'>

            <Container maxW='1400px'>

                <Flex pt='150px' pb='100px' px='40px'>

                    <Box flexBasis='50%'> {/*It is used to set intial main size of a flex item before free space is distributed according to the flexbox layout and specifies the size
                    of the content box of a flex item */}

                        <Heading >Prepare yourself for the Next Generation on Internet with Panaverse</Heading>

                        <Text size='2xl' pt='10px'>
                            One Year Program where you Earn as you Learn. Consolidating Web3.0, Metaverse, Aritificial Intelligence, IoT Technologies
                        </Text>

                        <Button mt='10px' colorScheme='pink'>More Info</Button>

                    </Box >

                    <Box mt='-50px' flexBasis='50%'>

                        <Image layout='responsive' src={VR} alt='Virtual Reality' />

                    </Box>

                </Flex>

            </Container>
        </Box>
    )
}
