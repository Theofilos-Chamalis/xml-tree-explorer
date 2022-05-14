import { FunctionComponent, useEffect } from 'react';
import styled from '@emotion/styled';

interface MainContentProps {}

const StyledContainerDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  max-width: 960px;
  padding-top: 24px;
`;

/**
 * This component is responsible for rendering all the content below
 * the application's Header and for performing an API call to the BE
 * to fetch the list of construction companies.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MainContent: FunctionComponent<MainContentProps> = ({}) => {
  // Perform logic just after the page is mounted.
  useEffect(() => {}, []);

  return <StyledContainerDiv></StyledContainerDiv>;
};

export default MainContent;
