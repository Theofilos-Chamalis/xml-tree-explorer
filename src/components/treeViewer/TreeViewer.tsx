import { FunctionComponent, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, Image } from '@mantine/core';
import Tree from 'react-d3-tree';
import { XMLStateProps } from '../layout/MainContent';
import TreeViewerInstructions from './TreeViewerInstructions';
import LeftIconUri from '/src/assets/left.png';
// import { convertParsedXMLToTreeFormat } from '../../utils/utils';

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

// Mock data that is used to fill the TreeViewer component. This is
// used since the convertParsedXMLToTreeFormat() function in /src/utils/utils.ts
// is not finished.
const mockTreeData = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      children: [
        {
          name: 'Foreman1',
          children: [
            {
              name: 'Worker1',
              attributes: {
                l: 'Another Test1',
              },
            },
            {
              name: 'Worker2',
              attributes: {
                l: 'Another Test2',
              },
            },
            {
              name: 'WorkerHouse',
              children: [
                {
                  name: 'Worker3',
                  attributes: {
                    l: 'Another Test3',
                  },
                },
                {
                  name: 'Worker4',
                  attributes: {
                    l: 'Another Test4',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'Foreman2',
          children: [
            {
              name: 'Worker5',
              attributes: {
                l: 'Another Test5',
              },
            },
            {
              name: 'Worker6',
              attributes: {
                l: 'Another Test6',
              },
            },
          ],
        },
      ],
    },
  ],
};

/**
 * Component that is responsible for presenting a vertical Tree based view
 * of the parsed XML file.
 *
 * @param {() => void} clearXMLTreeState
 * @param {XMLStateProps} xmlFile
 * @returns {JSX.Element}
 * @constructor
 */
const TreeViewer: FunctionComponent<TreeViewerProps> = ({ clearXMLTreeState, xmlFile }) => {
  // Once the xmlFile is parsed successfully, start converting the jsXMLObject
  // to the format that the react-d3-tree library requires.
  useEffect(() => {
    if (xmlFile.fileProps?.jsXMLObject) {
      console.log(xmlFile.fileProps.stringContent);
      // convertParsedXMLToTreeFormat(xmlFile.fileProps.jsXMLObject);
    }
  }, [xmlFile]);

  // Position the XML graph based on the device's screen size.
  const getInitialTreeXPosition = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth > 899) return 400;

    if (screenWidth < 899 && screenWidth > 600) return 280;

    return 180;
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
          leftIcon={<Image src={LeftIconUri} style={{ margin: '1px -32px 0 -16px' }} />}>
          BACK
        </Button>
      </TreeViewerTitleContainerDiv>
      <TreeViewerInstructions inline={false} />
      {xmlFile?.fileProps && !xmlFile.error && (
        <StyledTreeViewerCardContainerDiv>
          <TreeViewerInstructions inline={true} />
          <div style={{ width: '100%', height: '70vh' }}>
            <Tree
              data={mockTreeData}
              orientation={'vertical'}
              scaleExtent={{ min: 0.25, max: 1 }}
              translate={{ x: getInitialTreeXPosition(), y: 16 }}
            />
          </div>
        </StyledTreeViewerCardContainerDiv>
      )}
    </>
  );
};

export default TreeViewer;
