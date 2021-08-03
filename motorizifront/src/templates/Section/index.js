import styled from 'styled-components';
  
const Section = styled.section`
flex: 1 1 100%;
max-width: 100%;
overflow: hidden; 
z-index: 1;
pointer-events: none;
display: flex; 

  * {
    pointer-events: initial;
  }
`;
/* scroll */

export default Section;
