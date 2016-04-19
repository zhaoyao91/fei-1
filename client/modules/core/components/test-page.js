import React from 'react';
import Container from './container';
import {PageHeader, Input} from 'react-bootstrap';
import {ReactiveDict} from 'meteor/reactive-dict';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Inview from './inview';

class Page extends React.Component {
    render() {
        return <Container>
            <PageHeader>测试页</PageHeader>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <p>你好</p>
            <Inview onInview={(e,isInview)=>console.log(isInview)}>
                我不好
            </Inview>
        </Container>
    }
}

export default Page