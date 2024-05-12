import { Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <div className="flex flex-col p-4 items-center">
      <Heading className="text-green-950">JournalBoomBoom</Heading>
      <Text className="text-green-900">Tell me anything!</Text>
    </div>
  );
};

export default Header;
