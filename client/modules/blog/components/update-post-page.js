import React , {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import Container from '../../core/components/container';
import UpdatePostForm from '/client/modules/blog/containers/update-post-form';

const Page = ({postId, onReturn})=> {
    return <Container>
        <PageHeader>编辑文章</PageHeader>
        <UpdatePostForm {...{
            postId,
            cancelButtonText: '返回',
            onCancel: onReturn
        }}/>
    </Container>
};

Page.propTypes = {
    postId: React.PropTypes.string.isRequired,
    onReturn: React.PropTypes.func
};

export default Page