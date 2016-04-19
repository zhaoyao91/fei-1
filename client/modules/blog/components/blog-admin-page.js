import React from 'react';
import Container from '../../core/components/container';
import {PageHeader, Button, Panel, Grid, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import LoadMoreButton from '../../core/components/load-more-button';

const Page = ({posts, handlers, loadMoreButtonState})=> {
    const {onLoadMore, onCreatePost, ...otherHandlers} = handlers;

    return <Container>
        <PageHeader>管理文章</PageHeader>
        <div style={{marginBottom: '15px'}}>
            <Button bsStyle="primary" onClick={onCreatePost}>创建文章</Button>
        </div>
        <PostItems {...{posts, handlers: otherHandlers}}/>
        <LoadMoreButton {...{
            block: true,
            state: loadMoreButtonState,
            onLoadMore: onLoadMore,
            loadMoreOnInview: true
        }}/>
    </Container>
};

Page.propTypes = {
    // {title, createdAt, updatedAt, published}
    posts: React.PropTypes.arrayOf(React.PropTypes.object),

    // onLoadMore(), onCreatePost(), onTogglePublishState(id), onUpdate(id), onRemove(id)
    handlers: React.PropTypes.object,

    loadMoreButtonState: React.PropTypes.string
};

/**
 * @param post - {_id, title, createdAt, updatedAt, published}
 * @param handlers
 * @param handlers.onTogglePublishState - func(id)
 * @param handlers.onUpdate - func(id)
 * @param handlers.onRemove - func(id)
 */
const PostItem = ({post, handlers}) => {
    const {_id, title, createdAt, updatedAt, published} = post;
    const {onTogglePublishState, onUpdate, onRemove} = handlers;
    const createdAtString = moment(createdAt).format('YYYY-MM-DD hh:mm:ss');
    const updatedAtString = moment(updatedAt).format('YYYY-MM-DD hh:mm:ss');

    const onRemoveThis = ()=> {
        const confirmed = confirm('确定要删除这篇文章？');
        if (confirmed) {
            onRemove(_id);
        }
    };

    const onUpdateThis = ()=> { onUpdate(_id);};

    const onToggleThisPublishState = ()=> {onTogglePublishState(_id)};

    return <Panel>
        <h4>{title}</h4>
        <p>
            <span style={{marginRight: '1rem', float: 'left', whiteSpace: 'nowrap'}}>{'创建于：' + createdAtString}</span>
            <span style={{whiteSpace: 'nowrap'}}>{'更新于：' + updatedAtString}</span>
        </p>
        <Button bsStyle="primary" onClick={onUpdateThis}>编辑</Button>
        <Button style={{margin: '0 10px'}} bsStyle={published ? 'success': 'default'}
                onClick={onToggleThisPublishState}>{published ? '已发布' : '未发布'}</Button>
        <Button style={{float: 'right'}} bsStyle={'danger'} onClick={onRemoveThis}>删除</Button>
    </Panel>;
};

/**
 * @param posts - 全部传递给PostItem
 * @param handlers - 全部传递给PostItem
 */
const PostItems = ({posts, handlers}) => {
    return <div>
        {_.map(posts, (post)=> {
            return <PostItem key={post._id} {...{
                post,
                handlers
            }}/>;
        })}
    </div>
};

export default Page;