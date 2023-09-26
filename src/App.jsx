import "./App.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import ReactPlayer from "react-player";
import { BsPlayCircle, BsThreeDotsVertical } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navigation from "./components/Navigation";
import { URL } from "./constant";
import axios from "axios";

function App() {
  return (
    <Flex flexDir={"row"} bg="#F6F6F6">
      <Sidebar w="20%" display={["none", "block"]} />
      <Stack w={["100%", "100%", "80%"]}>
        <Navigation />
        <Flex flexDir={"column"} p={["20px 10px", "20px 30px"]}>
          <CoursePage />
        </Flex>
      </Stack>
    </Flex>
  );
}

export default App;

export const CoursePage = () => {
  const [loading, setLoading] = useState(true);
  const [createLoader, setCreateLoader] = useState(false);

  const [coursesList, setCourses] = useState([]);
  const [formInputs, setFormInputs] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [disabled, setDisabled] = useState(true);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    const { title, description, videoUrl, duration, instructor, price } =
      formInputs || {};
    if (
      !title ||
      !description ||
      !videoUrl ||
      !duration ||
      !instructor ||
      !price
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formInputs]);

  useEffect(() => {
    setLoading(true);
    axios.get(`${URL}/courses`).then((res) => {
      setLoading(false);
      setCourses(res?.data || []);
      console.log(res, "??");
    });
  }, [refresh]);

  const handleAdd = () => {
    console.log(formInputs, "::::");

    setCreateLoader(true);
    // return;
    axios
      .post(`${URL}/create`, formInputs)
      .then((res) => {
        setCreateLoader(false);
        console.log(res, "??");
        alert("Course creates succesfully");
        onClose();
        setRefresh({});
      })
      .catch(() => {
        setCreateLoader(false);
        alert("Something went wrong");
      });
  };
  return (
    <Flex flexDir={"column"} py="20px" h={["100vh", "100%"]}>
      <Flex flexDir={"column"}>
        <Flex
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb="10px"
        >
          <Text fontWeight={"900"} fontSize={"2em"} mb="20px">
            Courses
          </Text>

          <>
            <Button
              onClick={onOpen}
              bg="#b8a5f8"
              _hover={{ background: `#b8a5f850` }}
              _focus={{ background: `#b8a5f8` }}
              fontFamily={"Lato"}
              borderRadius={"9px"}
              size={"md"}
            >
              Add Course
            </Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add new Course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* <Lorem count={2} /> */}
                  <Flex flexDir={"column"} gap="10px">
                    <Flex flexDir={"column"}>
                      <Text {...textLabelStyle}>Title</Text>
                      <Input
                        onChange={(e) =>
                          setFormInputs((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        {...inputStyle}
                      />
                    </Flex>

                    <Flex flexDir={"row"} alignItems={"center"} gap="10px">
                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Video Url</Text>
                        <Input
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              videoUrl: e.target.value,
                            }))
                          }
                          type="url"
                          {...inputStyle}
                        />
                      </Flex>

                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Course Duration</Text>
                        <Input
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                          type="url"
                          {...inputStyle}
                        />
                      </Flex>
                    </Flex>
                    <Flex flexDir={"column"}>
                      <Text {...textLabelStyle}>Description</Text>
                      <Textarea
                        onChange={(e) =>
                          setFormInputs((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={6}
                        resize={"none"}
                        {...inputStyle}
                      />
                    </Flex>
                    <Flex flexDir={"column"}>
                      <Text {...textLabelStyle}>Instructor</Text>

                      <Select
                        defaultValue={"S"}
                        onChange={(e) =>
                          setFormInputs((prev) => ({
                            ...prev,
                            instructor: e.target.value,
                          }))
                        }
                        {...inputStyle}
                      >
                        <option disabled value={"S"}>
                          Select
                        </option>
                        <option value={"Babalola"}>Dr. Babalola Adesobu</option>
                        <option value={"Tobi"}>Dr. Emmanuel Tobi</option>
                        <option value={"Tobi"}>Dr. Kingsley Durotoye</option>
                      </Select>
                    </Flex>
                    <Flex flexDir={"column"}>
                      <Text {...textLabelStyle}>Price</Text>
                      <Input
                        onChange={(e) =>
                          setFormInputs((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        type="number"
                        {...inputStyle}
                      />
                    </Flex>
                  </Flex>
                </ModalBody>

                <ModalFooter>
                  <Button
                    onClick={handleAdd}
                    isLoading={createLoader}
                    isDisabled={disabled}
                    bg="#b8a5f8"
                    _hover={{ background: `#b8a5f850` }}
                    _focus={{ background: `#b8a5f8` }}
                    fontFamily={"Lato"}
                    borderRadius={"9px"}
                    size={"md"}
                  >
                    Add Course
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </Flex>

        {loading ? (
          <Flex h="300px" justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"lg"} />
          </Flex>
        ) : coursesList?.length < 1 ? (
          <Flex h="300px" justifyContent={"center"} alignItems={"center"}>
            <Text>No course has not been added</Text>
          </Flex>
        ) : (
          <Flex flexDir={"column"}>
            <MemorizedCourses setRefresh={setRefresh} list={coursesList} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
const Courses = ({ list, setRefresh }) => {
  const colors = ["#c2ddb9", "#f4e19e", "#f4f2f9", "#f5f0de", "#b8a5f8"];
  const [mobile] = useMediaQuery("(max-width:480px)");

  return (
    <Flex
      flexWrap={"wrap"}
      gap={["10px", "50px"]}
      maxW="900px"
      p={["10px", "none"]}
    >
      {list?.map((data, idx) => (
        <Flex
          flexDir={"column"}
          w={["100%", "250px"]}
          maxW={["100%", "300px"]}
          border="1.3px solid #000"
          borderRadius="10px"
          p="8px"
          overflow={"hidden"}
          bg={`${colors[Math.floor(Math.random() * colors.length)]}60`}
          id="xx"
        >
          {mobile ? (
            <ReactPlayer
              width={document.getElementById("xx")?.offsetWidth}
              height={"300px"}
              playIcon={<BsPlayCircle color="#fff" />}
              light="https://i.imgur.com/0PnQHkk.jpg"
              style={{
                marginLeft: "-8px",
                marginRight: "-8px",
                marginTop: "-8px",
                marginBottom: "10px",
              }}
              url={data?.videoUrl}
            />
          ) : (
            <ReactPlayer
              width={"250px"}
              height={"250px"}
              playIcon={<BsPlayCircle fontSize={"4em"} color="#fff" />}
              light="https://i.imgur.com/0PnQHkk.jpg"
              style={{
                marginLeft: "-8px",
                marginRight: "-8px",
                marginTop: "-8px",
                marginBottom: "10px",
              }}
              url={data?.videoUrl}
            />
          )}
          <Text fontWeight={"900"} lineHeight={"1.3"}>
            {data?.title}
          </Text>
          <Text color="grey" fontSize=".7em">
            {data?.instructor}
          </Text>

          {/* <Text fontSize={".7em"} mt="10px">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit...
          </Text> */}

          <Flex alignItems={"center"} gap="5px" fontSize={".7em"} mt="20px">
            <Flex alignItems={"center"} gap="5px">
              <AiOutlineClockCircle /> {data?.duration}
            </Flex>
            <Text>|</Text>
            <Flex alignItems={"center"} gap="5px">
              <AiOutlineUser /> {data?.noOfStudents || 0} students
            </Flex>
          </Flex>

          <Flex
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt="10px"
          >
            <Text fontWeight={"900"}>
              ₦{parseInt(data?.price)?.toLocaleString()}
            </Text>

            <Flex alignItems={"center "}>
              <AiOutlineHeart fontSize={"1.2em"} />
              <Text ml="6px" fontWeight={"bold"} fontSize={".8em"}>
                {data?.likes || 0}
              </Text>
              <Dot data={data} setRefresh={setRefresh} />
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export const MemorizedCourses = memo(Courses);

export const Dot = ({ data, setRefresh }) => {
  // const { onOpen, onClose, isOpen } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [formInputs, setFormInputs] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    setFormInputs(data);
  }, [data]);

  const handleUpdate = () => {
    console.log(formInputs);
    // return;

    setLoading(true);
    // return;
    axios
      .post(`${URL}/course/update/${data?._id}`, formInputs)
      .then((res) => {
        setLoading(false);
        console.log(res, "??");
        alert("Course updated succesfully");
        setEditOpen(false);
        setRefresh({});
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong");
      });
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    // return;
    axios
      .delete(`${URL}/course/delete/${data?._id}`)
      .then((res) => {
        setDeleteLoading(false);
        console.log(res, "??");
        alert("Course deleted succesfully");
        setEditOpen(false);
        setRefresh({});
      })
      .catch(() => {
        setDeleteLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <Popover
      isOpen={open}
      placement="right-start"
      onClose={() => setOpen((prev) => !prev)}
    >
      <PopoverTrigger>
        <Button
          p="0"
          m="0"
          bg="none"
          // w="0px"
          _hover={{ background: "none" }}
          _focus={{ background: "none" }}
          onClick={() => setOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent border="2px solid #000" w="90px">
        <PopoverArrow />
        <PopoverCloseButton onClick={() => setOpen((prev) => !prev)} />
        {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
        <PopoverBody fontSize={".9em"}>
          <>
            <Text
              mr="10px"
              onClick={() => setEditOpen((prev) => !prev)}
              cursor={"pointer"}
            >
              Edit
            </Text>

            <AlertDialog
              isCentered
              isOpen={editOpen}
              // leastDestructiveRef={cancelRef}
              onClose={() => setEditOpen((prev) => !prev)}
            >
              <AlertDialogOverlay>
                <AlertDialogContent border="2px solid ">
                  <AlertDialogHeader
                    fontFamily={"Lato"}
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    Edit Course
                  </AlertDialogHeader>

                  <AlertDialogBody fontFamily={"Lato"}>
                    <Flex flexDir={"column"} gap="10px">
                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Title</Text>
                        <Input
                          value={formInputs?.title}
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          {...inputStyle}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Video Url</Text>
                        <Input
                          value={formInputs?.videoUrl}
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              videoUrl: e.target.value,
                            }))
                          }
                          type="url"
                          {...inputStyle}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Description</Text>
                        <Textarea
                          value={formInputs?.description}
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows={6}
                          resize={"none"}
                          {...inputStyle}
                        />
                      </Flex>
                      <Flex flexDir={"column"}>
                        <Text {...textLabelStyle}>Price</Text>
                        <Input
                          value={formInputs?.price}
                          onChange={(e) =>
                            setFormInputs((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          type="number"
                          {...inputStyle}
                        />
                      </Flex>
                    </Flex>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      fontFamily={"Lato"}
                      bg="transparent"
                      _hover={{ background: "transparent" }}
                      border="1px solid grey"
                      color="#000"
                      onClick={() => setEditOpen((prev) => !prev)}
                    >
                      Cancel
                    </Button>
                    <Button
                      fontFamily={"Lato"}
                      bg="#b8a5f8"
                      _hover={{ background: "#b8a5f8" }}
                      color="#000"
                      onClick={handleUpdate}
                      isLoading={loading}
                      ml={3}
                    >
                      Update
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>

          <>
            <Text mr="10px" onClick={onOpen} cursor={"pointer"}>
              Delete
            </Text>

            <AlertDialog
              isCentered
              isOpen={isOpen}
              // leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent border="2px solid ">
                  <AlertDialogHeader
                    fontFamily={"Lato"}
                    fontSize="lg"
                    fontWeight="bold"
                  >
                    Remove Course
                  </AlertDialogHeader>

                  <AlertDialogBody fontFamily={"Lato"}>
                    You will not be able to retrieve it back
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      fontFamily={"Lato"}
                      bg="#b8a5f8"
                      _hover={{ background: "#b8a5f8" }}
                      color="#000"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      fontFamily={"Lato"}
                      bg="transparent"
                      _hover={{ background: "transparent" }}
                      border="1px solid grey"
                      color="#000"
                      onClick={handleDelete}
                      isLoading={deleteLoading}
                      ml={3}
                    >
                      Continue
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
          {/* <Text>Edit</Text> */}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export const textLabelStyle = {
  // colo",
  fontSize: ".8em",
  mb: "5px",
};

export const inputStyle = {
  _focusVisible: { boxShadow: "none" },
};
