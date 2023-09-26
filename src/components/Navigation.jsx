import { Avatar, Flex, Text } from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";

function Navigation() {
  return (
    <Flex w="100%" h="80px">
      <Flex
        alignItems={"center"}
        top="0"
        bg="#fff"
        zIndex={1}
        p="20px 40px"
        w={"100%"}
        h="80px"
        justifyContent={"space-between"}
        boxShadow="0px 3px 1px 0px #0000000d"
      >
        <Text fontSize={["1em", "1.3em"]} fontWeight="700"></Text>
        <Flex alignItems={"center"} gap="20px">
          <AiOutlineBell fontSize={"2em"} />
          <Avatar
            size="md"
            name="Prosper Otemuyiwa"
            src="https://bit.ly/prosper-baba"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navigation;
