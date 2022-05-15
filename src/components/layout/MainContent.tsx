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
 * the application's Header and for holding all state that is used
 * in its children.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MainContent: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [xmlFile, setXmlFile] = useState<XMLStateProps>({ error: null, fileProps: null });
  const [processStep, setProcessStep] = useState(1);
  const [isProcessingXMLFile, setIsProcessingXMLFile] = useState(false);

  // We add artificial delay to the "uploading" feature so that
  // we can view the loading state.
  const artificialSecondsDelay = 0.8;

  // If there is an error in the xmlFile state object, then show the ErrorModal.
  // If the jsXMLObject property is present proceed to the 2nd view of the app.
  useEffect(() => {
    if (xmlFile.error) return setIsModalOpen(true);

    if (xmlFile.fileProps?.jsXMLObject) {
      setProcessStep(2);
      setTimeout(() => {
        setIsProcessingXMLFile(false);
      }, artificialSecondsDelay * 1000);
    }
  }, [xmlFile]);

  // Clear all required state when the Error Modal is dismissed.
  const clearModalState = () => {
    setXmlFile({ error: null, fileProps: null });
    setIsProcessingXMLFile(false);
    setIsModalOpen(false);
  };

  // Clear just the XML state object where needed and return to step 1.
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
