import {h} from 'preact';
import Drawer from 'preact-material-components/Drawer';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';

const DrawerPage =({open,setToggle})=> {

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
          <Drawer.DrawerItem>
          About Me
          </Drawer.DrawerItem>
            <Drawer.DrawerItem href="/chatroom">
              Modules
            </Drawer.DrawerItem>
            <Drawer.DrawerItem href="/dynamic">
            Projects
            </Drawer.DrawerItem>
          </Drawer.DrawerContent>
        </Drawer>
      </div>
    );
  }


  export default DrawerPage