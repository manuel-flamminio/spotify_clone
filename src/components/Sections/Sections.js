import { useLoaderData } from "react-router-dom";
import Section from "./Section/Section";
import { useMediaQuery } from "react-responsive";

const Sections = () => {
    const sections = useLoaderData();

    let trim = 0;

    const isLg = useMediaQuery({ minWidth: 1601 });
    const isMd = useMediaQuery({ minWidth: 1301 });
    const isSm = useMediaQuery({ minWidth: 1001 });
    const isXSm = useMediaQuery({ minWidth: 771 });
  
    switch (true) {
      case isLg:
        trim = 8;
        break;
      case isMd:
        trim = 6;
        break;
      case isSm:
        trim = 4;
        break;
      case isXSm:
        trim = 3;
        break;
    }

    const component = sections.map((section) => (
        <Section key={section.id} section={section} trim={trim} />
      ));
    return ( 
        <>
        {component}
        </>
     );
}
 
export default Sections;