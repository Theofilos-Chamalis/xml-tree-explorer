import { FunctionComponent } from 'react';
import { Button, Modal } from '@mantine/core';
import { XMLStateProps } from './layout/MainContent';

export interface ErrorModalProps {
  isModalOpen: boolean;
  xmlFile: XMLStateProps;
  clearModalState: () => void;
}

const ErrorModal: FunctionComponent<ErrorModalProps> = ({
  isModalOpen,
  xmlFile,
  clearModalState,
}) => {
  return (
    <Modal
      opened={isModalOpen}
      centered={true}
      size={'sm'}
      styles={{
        header: { margin: '-18px -16px 0 0' },
        close: { color: 'black', width: 60, height: 60 },
      }}
      closeOnEscape={true}
      onClose={() => clearModalState()}
      title={<h2>File upload failed!</h2>}>
      <p>{xmlFile.error}. Please enter a valid XML file and try again later.</p>
      <br />
      <Button fullWidth={true} onClick={() => clearModalState()} color={'indigo'}>
        Try again
      </Button>
    </Modal>
  );
};

export default ErrorModal;
