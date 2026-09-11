import styled from "styled-components";
import { FaCircle, FaRegCopy } from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabins } from "./useDeleteCabins";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { IoMdRemove } from "react-icons/io";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;
const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  flex-direction: row;
`;

function CabinRow({ cabin }) {
  const { DeleteCabin, deletePending } = useDeleteCabins();
  const { createCabin, createPending } = useCreateCabin();

  const {
    id: Cabinid,
    name,
    image,
    regularPrice,
    discount,
    maxCapacity,
    description,
  } = cabin;

  function handleCopy() {
    createCabin({
      name: `copy of ${name}`,
      image,
      regularPrice,
      discount,
      maxCapacity,
      description,
    });
  }
  const isWorking = deletePending || createPending;
  if (isWorking) return <Spinner />;
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>fit up {maxCapacity} people</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount <= 0 ? "_" : formatCurrency(discount)}</Discount>

        <Modal>
          <Menus>
            <Menus.Toggle id={Cabinid} />
            <Menus.List id={Cabinid}>
              <Menus.Button onClick={handleCopy} icon={<FaRegCopy />}>
                copy
              </Menus.Button>
              <Modal.Open opens="edite">
                <Menus.Button icon={<FaCircle />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<IoMdRemove />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edite">
              <CreateCabinForm cabinToedit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                onConfirm={() => DeleteCabin(Cabinid)}
                resource={`cabin's name ${name}`}
              />
            </Modal.Window>
          </Menus>
        </Modal>
      </TableRow>
    </>
  );
}

export default CabinRow;
