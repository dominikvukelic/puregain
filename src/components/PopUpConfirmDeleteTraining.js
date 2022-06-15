import React, { useContext } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';

import { TrashIcon } from '@primer/octicons-react';
import { TrainingContext } from '../context/TrainingContext';

function PopUpConfirmDeleteTraining({ id }) {
    const { handleDeleteTraining } = useContext(TrainingContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleConfirmDelete = () => {
        handleDeleteTraining(id);
        onClose();
    };

    return (
        <>
            <IconButton aria-label="Delete" icon={<TrashIcon />} className="item-delete-btn" onClick={onOpen}>
                Delete
            </IconButton>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Do you want to delete this training from training history?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to delete this training from training history?</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleConfirmDelete}>
                            {' '}
                            Confirm
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default PopUpConfirmDeleteTraining;
