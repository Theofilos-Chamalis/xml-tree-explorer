import { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import FileUploader from '../FileUploader';
import TreeViewer from '../TreeViewer';
import { Button, Modal } from '@mantine/core';

interface MainContentProps {}

export interface FileProps extends File {
  path?: string;
  stringContent?: string | null;
  jsXMLObject?: any;
}

export interface FileStateProps {
  error: string | null;
  fileProps: FileProps | null;
}

const StyledContainerDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  padding-top: 24px;
`;

interface StyledFileUploaderContainerDivProps {
  processStep: number;
}

const StyledFileUploaderContainerDiv = styled.div<StyledFileUploaderContainerDivProps>`
  transition: all 0.6s ${({ processStep }) => (processStep === 1 ? '' : '1s')} ease-in-out;
  opacity: ${({ processStep }) => (processStep === 1 ? '1' : '0')};
  transform: translateY(${({ processStep }) => (processStep === 1 ? '0' : '-500px')});
`;

const StyledTreeViewerContainerDiv = styled.div<StyledFileUploaderContainerDivProps>`
  transition: all 0.6s ${({ processStep }) => (processStep === 2 ? '1s' : '')} ease-in-out;
  opacity: ${({ processStep }) => (processStep === 2 ? '1' : '0')};
  transform: translateY(${({ processStep }) => (processStep === 2 ? '-346px' : '-500px')});
`;

/**
 * This component is responsible for rendering all the content below
 * the application's Header and for performing an API call to the BE
 * to fetch the list of construction companies.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MainContent: FunctionComponent<MainContentProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xmlFile, setXmlFile] = useState<FileStateProps>({ error: null, fileProps: null });
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
      <StyledFileUploaderContainerDiv processStep={processStep}>
        <FileUploader
          setXmlFile={setXmlFile}
          setIsProcessingXMLFile={setIsProcessingXMLFile}
          isProcessingXMLFile={isProcessingXMLFile}
        />
      </StyledFileUploaderContainerDiv>
      <StyledTreeViewerContainerDiv processStep={processStep}>
        <TreeViewer clearXMLTreeState={clearXMLTreeState} />
      </StyledTreeViewerContainerDiv>
    </StyledContainerDiv>
  );
};

export default MainContent;
