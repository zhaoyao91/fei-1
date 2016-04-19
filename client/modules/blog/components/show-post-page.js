import React from 'react';
import moment from 'moment';
import Container from '../../core/components/container';
import PostContentWrapper from './post-content-wrapper';
import ReactDisqusThread from 'react-disqus-thread';

class Page extends React.Component {
    render() {
        const {post, disqus} = this.props;
        const id = _.get(post, '_id');
        const title = _.get(post, 'title');
        const createdAt = _.get(post, 'createdAt');
        const createdAtString = createdAt ? moment(createdAt).format('YYYY-MM-DD hh:mm:ss') : '';
        const content = _.get(post, 'content');
        const summary = _.get(post, 'summary');

        return <Container className="show-post-page">
            <h1 className="title" style={{textAlign: 'center'}}>{title}</h1>
            <p className="created-at" style={{textAlign: 'center'}}>{createdAtString}</p>
            <hr/>
            {
                summary ?
                    <pre className="summary" style={{whiteSpace: 'pre-wrap'}}>{summary}</pre> : null
            }
            <PostContentWrapper>{content}</PostContentWrapper>
            <hr/>
            {
                id && title && disqus && disqus.shortname?
                    <ReactDisqusThread
                        shortname={disqus.shortname}
                        identifier={id}
                        title={title}
                    /> : null
            }
        </Container>
    }
}

Page.propTypes = {
    // 需要_id，title，其他字段传给PostContentWrapper
    post: React.PropTypes.object,

    // disqus设置
    disqus: React.PropTypes.object
};

export default Page;