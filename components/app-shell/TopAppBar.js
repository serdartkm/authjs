import {h} from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/TopAppBar/style.css';
import './app-shell.css'

const TopAppBarNav = ({toggle,setToggle,title})=> {
    
    return (
      
        <TopAppBar className="topappbar fixed top-bar" onNav={()=>{setToggle(!toggle)}}>
            <TopAppBar.Row>
              <TopAppBar.Section align-start>
                <TopAppBar.Icon navigation>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                </TopAppBar.Icon>
                <TopAppBar.Title>
                  {title}
                </TopAppBar.Title>
              </TopAppBar.Section>
              <TopAppBar.Section align-end>
                <TopAppBar.Icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                </TopAppBar.Icon>
              </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
  
    );
  
}

export default TopAppBarNav