import {h} from 'preact';
import Drawer from 'preact-material-components/Drawer';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';

const DrawerPage =({open,setToggle, items})=> {

    return (
      <div>
     
        <Drawer
          modal
          open={open}
          onClose={() => {
            setToggle(false) 
          }}
        >
          <Drawer.DrawerHeader className="mdc-theme--primary-bg">
           Portfolio
           <input />
          </Drawer.DrawerHeader>
          <Drawer.DrawerContent>
            {items && items.map((item,i)=>{
              console.log('item',item)
              return(
                <Drawer.DrawerItem href={`${item.route}`}>
                {item.title}
                </Drawer.DrawerItem>
              )
            })}
          </Drawer.DrawerContent>
        </Drawer>
      </div>
    );
  }


  export default DrawerPage