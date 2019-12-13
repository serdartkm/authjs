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
          //  setToggle(false) 
          }}
        >
          <Drawer.DrawerHeader className="mdc-theme--primary-bg">
           Portfolio
           <input type="text" style={{opacity: 0}} />
          </Drawer.DrawerHeader>
          <Drawer.DrawerContent>
            {items && items.map((item,i)=>{
              return(
                <Drawer.DrawerItem onClick={setToggle} href={`${item.route}`}>
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