import NavItem from "./NavItem/NavItem";
import classes from './NavItems.module.css'

const NavItems = (props) => {
    const items = props.items.map((item, index) => (<NavItem key={index} {...item} />)) 
    return ( <div className={classes.Items}>{items}</div> );
}
 
export default NavItems;