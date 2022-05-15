import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

export interface TreeViewerInstructionsProps {
  inline: boolean;
}

const StyledInstructionsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #4c6ef5;
  padding: 0 12px;
  border-radius: 12px;
  width: 20%;
  color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledInstructionsContainerDivMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background-color: #4c6ef5;
    padding: 1px 12px;
    border-radius: 12px;
    width: 100%;
    color: #ffffff;
    margin-bottom: 16px;
  }
`;

const StyledInstructionsTitle = styled.h3`
  text-align: center;
`;

const StyledHorizontalLine = styled.hr`
  margin: -12px 0 20px;
`;

const StyledInstructionLines = styled.p`
  margin-top: -6px;
`;

/**
 * Component that is responsible for presenting the instruction steps
 * to explore the tree presented via the TreeViewer.
 *
 * @param {boolean} inline
 * @returns {JSX.Element}
 * @constructor
 */
const TreeViewerInstructions: FunctionComponent<TreeViewerInstructionsProps> = ({ inline }) => {
  const instructionsContent = (
    <>
      <StyledInstructionsTitle>Instructions</StyledInstructionsTitle>
      <StyledHorizontalLine />
      <StyledInstructionLines>1. Drag n Drop to move around the graph.</StyledInstructionLines>
      <StyledInstructionLines>2. Zoom in/out using the scroll wheel.</StyledInstructionLines>
      <StyledInstructionLines>3. Click on nodes to toggle their children.</StyledInstructionLines>
    </>
  );

  return inline ? (
    <StyledInstructionsContainerDiv>{instructionsContent}</StyledInstructionsContainerDiv>
  ) : (
    <StyledInstructionsContainerDivMobile>
      {instructionsContent}
    </StyledInstructionsContainerDivMobile>
  );
};

export default TreeViewerInstructions;
