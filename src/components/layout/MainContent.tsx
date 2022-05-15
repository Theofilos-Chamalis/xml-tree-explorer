import { FunctionComponent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import FileUploader from '../fileUploader/FileUploader';
import TreeViewer from '../treeViewer/TreeViewer';
import SlidingAnimationContainer from './SlidingAnimationContainer';
import ErrorModal from '../shared/ErrorModal';

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
  height: 100vh;
  @media (max-width: 418.5px) {
    padding-bottom: 240px;
  }
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

  const artificialSecondsDelay = 0.8;

  useEffect(() => {
    if (xmlFile.error) return setIsModalOpen(true);

    if (xmlFile.fileProps?.jsXMLObject) {
      setProcessStep(2);
      setTimeout(() => {
        setIsProcessingXMLFile(false);
      }, artificialSecondsDelay * 1000);
    }
  }, [xmlFile]);

  const clearModalState = () => {
    setXmlFile({ error: null, fileProps: null });
    setIsProcessingXMLFile(false);
    setIsModalOpen(false);
  };

  const clearXMLState = () => {
    setXmlFile({ error: null, fileProps: null });
    setProcessStep(1);
  };

  return (
    <StyledContainerDiv>
      <ErrorModal isModalOpen={isModalOpen} clearModalState={clearModalState} xmlFile={xmlFile} />
      <SlidingAnimationContainer currentProcessStep={processStep} ownProcessStep={1}>
        <FileUploader
          setXmlFile={setXmlFile}
          setIsProcessingXMLFile={setIsProcessingXMLFile}
          isProcessingXMLFile={isProcessingXMLFile}
        />
      </SlidingAnimationContainer>
      <SlidingAnimationContainer currentProcessStep={processStep} ownProcessStep={2}>
        <TreeViewer clearXMLTreeState={clearXMLState} xmlFile={xmlFile} />
      </SlidingAnimationContainer>
    </StyledContainerDiv>
  );
};

export default MainContent;
