import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { XMLFileProps, XMLStateProps } from '../components/layout/MainContent';

export const readAndParseIncomingFile = (
  incomingFile: XMLFileProps,
  setXmlFile: (xmlFileProps: XMLStateProps) => void,
  setIsProcessingXMLFile: (isProcessing: boolean) => void,
) => {
  setIsProcessingXMLFile(true);
  const reader = new FileReader();

  reader.onabort = () => setXmlFile({ error: 'File reading was aborted', fileProps: incomingFile });

  reader.onerror = () => setXmlFile({ error: 'File reading has failed', fileProps: incomingFile });

  reader.onload = () => {
    const stringContent = reader?.result?.toString().trim() ?? null;

    if (!stringContent) {
      return setXmlFile({ error: 'File is empty', fileProps: incomingFile });
    } else {
      const jsXMLObject = parseXMLContent(stringContent);

      if (!jsXMLObject)
        return setXmlFile({ error: 'File syntax is invalid', fileProps: incomingFile });

      setXmlFile({ error: null, fileProps: { ...incomingFile, stringContent, jsXMLObject } });
    }
  };

  reader.readAsText(incomingFile);
};

export const parseXMLContent = (xmlString: string) => {
  if (XMLValidator.validate(xmlString) !== true) return null;

  return new XMLParser().parse(xmlString);
};
