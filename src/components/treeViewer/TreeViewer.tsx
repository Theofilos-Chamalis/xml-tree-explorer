import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Button, Image } from '@mantine/core';
import Tree from 'react-d3-tree';
import { XMLStateProps } from '../layout/MainContent';
import TreeViewerInstructions from './TreeViewerInstructions';

interface TreeViewerProps {
  clearXMLTreeState: () => void;
  xmlFile: XMLStateProps;
}

const TreeViewerTitleContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 418.5px) {
    margin-top: -48px;
  }
`;

const StyledTreeViewerCardContainerDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 97%;
  height: fit-content;
  border-radius: 18px;
  padding: 16px;
`;

const TreeViewer: FunctionComponent<TreeViewerProps> = ({ clearXMLTreeState, xmlFile }) => {
  const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <TreeViewerTitleContainerDiv>
        <div>
          <h1>2. Then, explore the XML tree</h1>
        </div>
        <Button
          variant={'subtle'}
          size={'xl'}
          color={'indigo'}
          onClick={() => clearXMLTreeState()}
          style={{ marginRight: -36 }}
          leftIcon={<Image src={'/src/assets/left.png'} style={{ margin: '1px -32px 0 -16px' }} />}>
          BACK
        </Button>
      </TreeViewerTitleContainerDiv>
      <TreeViewerInstructions inline={false} />
      {xmlFile?.fileProps && !xmlFile.error && (
        <StyledTreeViewerCardContainerDiv>
          <TreeViewerInstructions inline={true} />
          <div style={{ width: '100%', height: '70vh' }}>
            <Tree data={orgChart} orientation={'vertical'} scaleExtent={{ min: 0.25, max: 1 }} />
          </div>
        </StyledTreeViewerCardContainerDiv>
      )}
    </>
  );
};

export default TreeViewer;
