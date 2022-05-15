import { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import FileUploader from '../FileUploader';
import TreeViewer from '../TreeViewer';
import { Button, Modal } from '@mantine/core';
import SlidingAnimationContainer from './SlidingAnimationContainer';

export interface XMLFileProps extends File {
  path?: string;
  stringContent?: string | null;
  jsXMLObject?: any;
}

export interface XMLStateProps {
  error: string | null;
  fileProps: XMLFileProps | null;
}

const StyledContainerDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  padding-top: 24px;
`;

/**
 * This component is responsible for rendering all the content below
 * the application's Header and for performing an API call to the BE
 * to fetch the list of construction companies.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MainContent: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xmlFile, setXmlFile] = useState<XMLStateProps>({ error: null, fileProps: null });
  const [processStep, setProcessStep] = useState(1);
  const [isProcessingXMLFile, setIsProcessingXMLFile] = useState(false);

  useEffect(() => {
    if (xmlFile.error) {
      return setIsModalOpen(true);
    }

    if (xmlFile.fileProps?.jsXMLObject) {
      setProcessStep(2);
      setIsProcessingXMLFile(false);
    }
  }, [xmlFile]);

  const clearModalState = () => {
    setXmlFile({ error: null, fileProps: null });
    setIsProcessingXMLFile(false);
    setIsModalOpen(false);
  };

  const clearXMLTreeState = () => {
    setXmlFile({ error: null, fileProps: null });
    setProcessStep(1);
  };

  return (
    <StyledContainerDiv>
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
      <SlidingAnimationContainer currentProcessStep={processStep} ownProcessStep={1}>
        <FileUploader
          setXmlFile={setXmlFile}
          setIsProcessingXMLFile={setIsProcessingXMLFile}
          isProcessingXMLFile={isProcessingXMLFile}
        />
      </SlidingAnimationContainer>
      <SlidingAnimationContainer currentProcessStep={processStep} ownProcessStep={2}>
        <TreeViewer clearXMLTreeState={clearXMLTreeState} />
      </SlidingAnimationContainer>
    </StyledContainerDiv>
  );
};

export default MainContent;
