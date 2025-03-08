import React, { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Center,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import {useHistory} from 'react-router-dom'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const Homepage = () => {

  const history= useHistory();

  useEffect(()=>{
     const user=JSON.parse(localStorage.getItem("userInfo"));
     if(user)
      history.push('/chats');
  },[history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Center>
          <Text fontSize="4xl" fontFamily="Work sans" color="black">
            Talk-A-Tive
          </Text>
        </Center>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
