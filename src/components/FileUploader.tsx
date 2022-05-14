import { FunctionComponent } from 'react';
import { Dropzone } from '@mantine/dropzone';
import styled from '@emotion/styled';
import { Image } from '@mantine/core';
import { FileStateProps } from './layout/MainContent';

interface FileUploaderProps {
  setXmlFile: (xmlFileProps: FileStateProps) => void;
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

const FileUploader: FunctionComponent<FileUploaderProps> = ({ setXmlFile }) => {
  const fileSizeMBLimit = 2;

  const dropzoneChildren = () => (
    <StyledUploaderContent>
      <Image src={'/src/assets/xml.png'} height={80} width={80} />
      <StyledUploaderTextContainer>
        <StyledUploaderBodyText>
          Drag your XML file here or click to select one from your computer
        </StyledUploaderBodyText>
        <StyledUploaderSubtitleText>
          File should have a valid xml syntax and not exceed {fileSizeMBLimit}MB
        </StyledUploaderSubtitleText>
      </StyledUploaderTextContainer>
    </StyledUploaderContent>
  );

  return (
    <>
      <h1>1. First, upload your file</h1>
      <Dropzone
        onDrop={files => setXmlFile({ error: null, fileProps: files[0] })}
        onReject={files =>
          setXmlFile({ error: files[0].errors[0].message, fileProps: files[0].file })
        }
        multiple={false}
        loading={false}
        maxSize={fileSizeMBLimit * 1024 ** 2}
        accept={['text/xml']}
        radius={18}>
        {() => dropzoneChildren()}
      </Dropzone>
    </>
  );
};

export default FileUploader;
