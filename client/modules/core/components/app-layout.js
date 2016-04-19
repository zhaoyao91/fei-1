import React from 'react';
import {Placeholder as ToastPlaceholder} from '../../../lib/toast';
import AppBar from '../containers/app-bar';
import Container from './container';

const Layout = ({content, footer})=> {
    return <div>
        <header>
            <AppBar/>
            <div style={{visible: false, height: '50px'}}>todo AppBar占位符，待AppBar修复后去掉</div>
        </header>

        <div>
            {content()}
            <ToastPlaceholder />
        </div>

        <footer>
            <hr style={{margin: '0'}}/>
            <div style={{textAlign: 'center', position: 'relative', top: '50%', transform: 'translateY(-50%)'}}>
                <a style={{color: 'inherit'}} href={footer.href} target={footer.target}>{footer.text}</a>
            </div>
        </footer>
    </div>
};

Layout.propsTypes = {
    content: React.PropTypes.func,

    // {text, href, target}，通常是备案号
    footer: React.PropTypes.object
};

Layout.defaultProps = {
    content: ()=>null,
    footer: {}
};

export default Layout