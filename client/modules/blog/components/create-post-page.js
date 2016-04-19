import React , {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import Container from '/client/modules/core/components/container';
import CreatePostForm from '../containers/create-post-form';

const Page = (props)=> {
    const {onSuccess} = props;

    return <Container>
        <PageHeader>创建文章</PageHeader>
        <CreatePostForm {...{
            onSuccess
        }}/>
    </Container>
};

Page.propTypes = {
    onSuccess: React.PropTypes.func
};

export default Page