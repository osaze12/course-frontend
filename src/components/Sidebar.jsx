import { Flex, Text, Box } from "@chakra-ui/react";
import { BiSolidDashboard } from "react-icons/bi";

function Sidebar({ ...props }) {
  return (
    <Flex h="100vh" w="20%" display={"flex"} {...props} position={"relative"}>
      <Flex
        position={"fixed"}
        w={"20%"}
        display={"flex"}
        h="100vh"
        flexDir={"column"}
        bg="#fff"
        zIndex={"999"}
        justifyContent="space-between"
        py="20px"
      >
        <Text pl="30px" fontSize={"2em"} mb="20px" fontWeight={"900"}>
          {/* Management */}
        </Text>
        <Flex flex=".9" flexDir={"column"} gap="30px" pl="30px">
          {NAVS.map(({ to, title, icon: Icon }, idx) => (
            <Flex>
              {
                <Box key={idx} to={to} cursor="pointer">
                  <Flex
                    gap="10px"
                    alignItems={"center"}
                    fontWeight="600"
                    onClick={() => setActiveSubPage(null)}
                  >
                    <Icon fontSize={"1.3em"} />
                    <Text fontSize={".91em"}>{title}</Text>
                  </Flex>
                </Box>
              }
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;

const NAVS = [{ title: "Dashboard", to: "/", icon: BiSolidDashboard }];
