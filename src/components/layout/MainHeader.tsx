import { FunctionComponent } from 'react';
import { Header } from '@mantine/core';
import styled from '@emotion/styled';
import headerLogoUri from '/src/assets/icon-192.png';

const StyledDivContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const StyledImage = styled.img`
  max-height: 100%;
`;

const StyledHeaderTitle = styled.h1`
  margin: auto;
  font-weight: 800;
`;

/**
 * The header that is shown on the top of the page. It shows the
 * application logo on the left and the application name in the
 * center.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MainHeader: FunctionComponent = () => {
  return (
    <Header height={60} p="xs">
      <StyledDivContainer>
        <StyledImage src={headerLogoUri} alt={'Header logo'} />
        <StyledHeaderTitle>XML TREE EXPLORER</StyledHeaderTitle>
      </StyledDivContainer>
    </Header>
  );
};

export default MainHeader;
