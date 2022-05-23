import { FunctionComponent } from 'react';
import { Image } from '@mantine/core';
import styled from '@emotion/styled';
import XMLIconUri from '/src/assets/xml.png';

interface FileUploaderContentProps {
  fileSizeLimitInMB: number;
}

const StyledUploaderContent = styled.div`
  display: flex;
  min-height: 220px;
  justify-content: center;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 0 8px;
  }
`;

const StyledUploaderBodyText = styled.p`
  font-size: 20px;
  margin: 0 0 8px 0;
`;

const StyledUploaderSubtitleText = styled.p`
  font-size: 15px;
  color: dimgray;
  margin: 0 0 8px 0;
`;

const StyledUploaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * The content that is shown inside the File Uploader component.
 *
 * @param {number} fileSizeLimitInMB
 * @returns {JSX.Element}
 * @constructor
 */
const FileUploaderContent: FunctionComponent<FileUploaderContentProps> = ({
  fileSizeLimitInMB,
}) => {
  return (
    <StyledUploaderContent>
      <Image src={XMLIconUri} height={80} width={80} />
      <StyledUploaderTextContainer>
        <StyledUploaderBodyText>
          Drag your XML file here or click to select one from your computer
        </StyledUploaderBodyText>
        <StyledUploaderSubtitleText>
          File should have a valid xml syntax and not exceed {fileSizeLimitInMB}MB
        </StyledUploaderSubtitleText>
      </StyledUploaderTextContainer>
    </StyledUploaderContent>
  );
};

export default FileUploaderContent;
