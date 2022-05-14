import { FunctionComponent } from 'react';
import MainContainer from './components/layout/MainContainer';
import MainContent from './components/layout/MainContent';

interface AppProps {}

/**
 * The parent component of the FE application.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App: FunctionComponent<AppProps> = ({}) => {
  return (
    <MainContainer>
      <MainContent />
    </MainContainer>
  );
};

export default App;
