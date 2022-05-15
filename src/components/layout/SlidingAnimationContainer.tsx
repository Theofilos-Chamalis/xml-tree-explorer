import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface SlidingAnimationContainerProps {
  children?: React.ReactNode;
  currentProcessStep: number;
  ownProcessStep: number;
}

interface StyledSlidingAnimationContainerDivProps {
  currentProcessStep: number;
  ownProcessStep: number;
  initialYOffset: string;
}

const StyledAnimationContainerDiv = styled.div<StyledSlidingAnimationContainerDivProps>`
  opacity: ${({ currentProcessStep, ownProcessStep }) =>
    currentProcessStep === ownProcessStep ? '1' : '0'};

  transform: translateY(
    ${({ currentProcessStep, ownProcessStep, initialYOffset }) =>
      currentProcessStep === ownProcessStep ? initialYOffset : '-500px'}
  );

  transition: all 0.6s ${({ currentProcessStep }) => (currentProcessStep === 1 ? '' : '1s')}
    ease-in-out;
`;

const SlidingAnimationContainer: FunctionComponent<SlidingAnimationContainerProps> = ({
  children,
  currentProcessStep,
  ownProcessStep,
}) => {
  const initialYOffsetInPixels = ownProcessStep === 2 ? '-346px' : '0';

  return (
    <StyledAnimationContainerDiv
      currentProcessStep={currentProcessStep}
      ownProcessStep={ownProcessStep}
      initialYOffset={initialYOffsetInPixels}>
      {children}
    </StyledAnimationContainerDiv>
  );
};

export default SlidingAnimationContainer;
