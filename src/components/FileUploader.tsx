import { FunctionComponent } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { XMLStateProps } from './layout/MainContent';
import { readAndParseIncomingFile } from '../utils/utils';
import FileUploaderContent from './FileUploaderContent';

interface FileUploaderProps {
  setXmlFile: (xmlFileProps: XMLStateProps) => void;
  setIsProcessingXMLFile: (isProcessing: boolean) => void;
  isProcessingXMLFile: boolean;
}

const FileUploader: FunctionComponent<FileUploaderProps> = ({
  setXmlFile,
  setIsProcessingXMLFile,
  isProcessingXMLFile,
}) => {
  const fileSizeMBLimit = 5;

  return (
    <>
      <h1>1. First, upload your file</h1>
      <Dropzone
        onDrop={files => readAndParseIncomingFile(files[0], setXmlFile, setIsProcessingXMLFile)}
        onReject={files =>
          setXmlFile({ error: files[0].errors[0].message, fileProps: files[0].file })
        }
        multiple={false}
        loading={isProcessingXMLFile}
        maxSize={fileSizeMBLimit * 1024 ** 2}
        accept={['text/xml']}
        radius={18}>
        {() => <FileUploaderContent fileSizeLimitInMB={fileSizeMBLimit} />}
      </Dropzone>
    </>
  );
};

export default FileUploader;
