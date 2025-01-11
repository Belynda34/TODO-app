import React, { useEffect,useState } from "react";
import Card from "./components/Card.jsx";
import Searchbar from "./components/Searchbar";
import Dropdown from "./components/Dropdown";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import pic from "./images/img.png";
import { useTaskStore } from "./api/task";


const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();

  const { fetchTasks,tasks,createTask } = useTaskStore();

  const [taskInput, setTaskInput] = useState(""); 


  useEffect(() => {
    fetchTasks();
    console.log("Fetching products ... ");
  }, [fetchTasks]);


  const handleInputChange = (e) => {
    setTaskInput(e.target.value)
  }

  const handleTaskCreation  = async () =>{
    if (taskInput.trim() === ""){
      alert("Please enter a task")
      return
    }

    const newTask = {name : taskInput}
    const result = await createTask(newTask);
    if (result.success) { 
      setTaskInput("");
      onClose();
    }else{
      alert(result.message)
    }
  }

  return (
    <>
    <div className="pb-20">
      <h1
        className={`font-bold  text-center text-3xl mt-16 pt-10 ${
          colorMode === "light" ? "text-black" : "text-gray-600"
        }`}
      >
        TODO LIST
      </h1>

      <div className="flex items-center justify-center mt-10">
        <Searchbar />
        <Dropdown />
        <button
          onClick={toggleColorMode}
          className="bg-violet-600 p-3 rounded-lg"
        >
          {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
        </button>
      </div>

      {tasks.length > 0 ? (
        <div className="flex flex-col gap-8 justify-center items-center mt-12">
          {(tasks || []).map((task) => {
            console.log("Rendering task:", task);
            return <Card key={task.id} task={task} />;
          })}
          {/* */}
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center">
          <img src={pic} alt="" />
          <span className="text-xl font-semibold">Empty ...</span>
        </div>
      )}

      <footer className="relative h-full">
        <button
          onClick={onOpen}
          className={`fixed bottom-16 right-32 p-4  rounded-full ${
            colorMode === "light" ? "bg-violet-600" : "bg-violet-600"
          }`}
        >
          <FaPlus className="text-2xl text-white" />
        </button>
      </footer>
      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={28}
            fontWeight={"bold"}
            className=" font-extrabold text-center"
          >
            NEW NOTE
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              value={taskInput}
              onChange={handleInputChange}
              placeholder="Input your note..."
              className={`w-[25rem] pl-3 p-2 rounded-lg border-2 ${
                colorMode === "light" ? "border-violet-600" : "border-white"
              }`}
            />
          </ModalBody>
          <ModalFooter mt={40}>
            <button className="w-[7rem] h-10 border-[2px] border-violet-600 text-violet-600 font-semibold rounded-xl mr-44" onClick={onClose}>
              CANCEL
            </button>
            <button className="w-[7rem] h-10 bg-violet-600 rounded-xl text-white font-semibold" onClick={handleTaskCreation}>
              APPLY
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </>
    
  );
};

export default Home;
