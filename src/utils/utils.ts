import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { XMLFileProps, XMLStateProps } from '../components/layout/MainContent';

/**
 * Utility function that is used to:
 * 1. Check if an input string has valid XML format or return null.
 * 2. If the input string is a valid XML, parse it to a JS object.
 *
 * @param {string} xmlString
 * @returns {any}
 */
export const parseXMLContent = (xmlString: string) => {
  if (XMLValidator.validate(xmlString) !== true) return null;

  return new XMLParser().parse(xmlString);
};

/**
 * Utility function that reads incoming files from the FileUploader.
 * If there are issues during the process, we show the Error Modal.
 * Otherwise, we validate and parse the string from the read process
 * and if it is a valid XML, we update the xmlFile state object
 * accordingly using the setXmlFile().
 *
 * @param {XMLFileProps} incomingFile
 * @param {(xmlFileProps: XMLStateProps) => void} setXmlFile
 * @param {(isProcessing: boolean) => void} setIsProcessingXMLFile
 */
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

type TraverseFunction<T> = (obj: T, prop: string, value: unknown, scope: string[]) => void;

/**
 * Utility function (internal of traverseObject), which is used
 * to traverse JS objects recursively (DFS) and provide useful
 * information on each traversal step.
 *
 * @param {T} object
 * @param {TraverseFunction<T>} fn
 * @param {string[]} scope
 */
const traverseInternal = <T = Record<string, unknown>>(
  object: T,
  fn: TraverseFunction<T>,
  scope: string[] = [],
): void => {
  Object.entries(object).forEach(([key, value]) => {
    fn.apply(this, [object, key, value, scope]);
    if (value !== null && typeof value === 'object') {
      traverseInternal(value, fn, scope.concat(key));
    }
  });
};

/**
 * Wrapper function of the traverseInternal, which
 * is used to traverse JS objects.
 *
 * @param {T} object
 * @param {TraverseFunction<T>} fn
 */
export const traverseObject = <T = Record<string, unknown>>(
  object: T,
  fn: TraverseFunction<T>,
): void => traverseInternal(object, fn, []);

// ===============================
// Unfinished function that is responsible for converting
// a parsed JS object to the data format that react-d3-tree
// requires to render the tree.
// =========================

/*export const convertParsedXMLToTreeFormat = (xmlObj: unknown) => {
  let tree = {};
  let previousDepth = 0;
  let siblingIndex = 0;

  const traverseFunction = (OBJ: unknown, KEY: unknown, VALUE: unknown, pathScope: unknown) => {
    if (Object.keys(tree).length === 0 && KEY === '?xml') {
      return;
    }

    console.warn({ OBJ }, { KEY }, { VALUE }, { pathScope });

    if (typeof VALUE === 'object') {
      if (pathScope.length === 0) {
        tree.name = KEY;
        tree.children = [];
      } else if (pathScope.length === 1) {
        tree.children[siblingIndex] = { name: KEY };
        tree.children[siblingIndex].children = [];
      } else if (pathScope.length === 2) {
        tree.children[siblingIndex].children[0] = { name: KEY };
        tree.children[siblingIndex].children[0].children = [];
      }
    } else {
      const leafKeys = Object.keys(OBJ);
      const siblingIndex = leafKeys.findIndex(item => item === KEY);
    }

    previousDepth = pathScope.length;
  };

  traverseObject(xmlObj, traverseFunction);

  console.log(tree);
};*/
