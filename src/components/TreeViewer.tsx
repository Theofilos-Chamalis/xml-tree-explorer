import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Button, Image } from '@mantine/core';

interface TreeViewerProps {
  clearXMLTreeState: () => void;
}

const TreeViewerTitleContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TreeViewer: FunctionComponent<TreeViewerProps> = ({ clearXMLTreeState }) => {
  return (
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
  );
};

export default TreeViewer;
