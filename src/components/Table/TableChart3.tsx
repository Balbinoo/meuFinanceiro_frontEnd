import { Table } from "@mantine/core";
import { House, ShoppingBag, ShoppingBasket } from "lucide-react";

const elements = [
  {
    icon: <House size={16} color="black" />,
    payment: "Home & bills - 1 payment",
    value: "$1,400.00",
  },
  {
    icon: <ShoppingBasket size={16} color="black" />,
    payment: "Food & groceries - 6 payments ",
    value: "$312.40",
  },
  {
    icon: <ShoppingBag size={16} color="black" />,
    payment: "Shopping - 2 payments",
    value: "$248.00",
  },
];

const TableChart3 = () => {
  const rows = elements.map((element) => (
    <Table.Tr>
      <Table.Td>{element.icon}</Table.Td>
      <Table.Td>{element.payment}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"xl"}>
      <Table.Thead></Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart3;
