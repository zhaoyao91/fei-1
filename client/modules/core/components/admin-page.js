import React from 'react';
import Container from './container';
import {PageHeader, FormGroup, FormControl, ControlLabel, InputGroup, Button} from 'react-bootstrap';
import UpdateInputGroup from '../../core/components/update-input-group';
import ClientUtils from '../../../lib/client-utils';

const Page = ({
    blogAdminPagePath,
    title,
    onUpdateTitle, // func(value)
    metas,
    onUpdateMetas, // func(value)
    links,
    onUpdateLinks, // func(value)
    appbarBrand,
    onUpdateAppbarBrand, // func(value)
    appbarLinks,
    onUpdateAppbarLinks, // func(value)
    footer,
    onUpdateFooter, // func(value)
    indexPageTitle,
    onUpdateIndexPageTitle, // func(value)
    indexPageCarousel,
    onUpdateIndexPageCarousel, // func(value)
    indexPageSectionA,
    onUpdateIndexPageSectionA, // func(value)
    indexPageSectionB,
    onUpdateIndexPageSectionB, // func(value)
    })=> {
    return <Container>
        <PageHeader>系统管理</PageHeader>
        <div style={{marginBottom: '15px'}}>
            <Button bsStyle="primary" href={blogAdminPagePath}>管理文章</Button>
        </div>
        <hr/>
        <h2>网站设置</h2>
        <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                value: title,
                onUpdate({value}) {onUpdateTitle(value)}
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Metas</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: metas.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: metas,
                onUpdate({value}) { onUpdateMetas(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Links</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: links.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: links,
                onUpdate({value}) { onUpdateLinks(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <hr/>
        <h2>导航栏设置</h2>
        <FormGroup>
            <ControlLabel>Brand</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: appbarBrand.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: appbarBrand,
                onUpdate({value}) { onUpdateAppbarBrand(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Links</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: appbarLinks.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: appbarLinks,
                onUpdate({value}) { onUpdateAppbarLinks(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <hr/>
        <h2>页脚设置</h2>
        <FormGroup>
            <ControlLabel>页脚内容</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: footer.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: footer,
                onUpdate({value}) { onUpdateFooter(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <hr/>
        <h2>首页设置</h2>
        <FormGroup>
            <ControlLabel>标题</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                value: indexPageTitle,
                onUpdate({value}) {onUpdateIndexPageTitle(value)}
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>轮播海报</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: indexPageCarousel.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: indexPageCarousel,
                onUpdate({value}) { onUpdateIndexPageCarousel(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>区域A</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: indexPageSectionA.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: indexPageSectionA,
                onUpdate({value}) { onUpdateIndexPageSectionA(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>区域B</ControlLabel>
            <UpdateInputGroup {...{
                ComponentClass: FormControl,
                componentProps: {
                    componentClass: 'textarea',
                    rows: indexPageSectionB.split('\n').length,
                    style: {resize: 'vertical'}
                },
                value: indexPageSectionB,
                onUpdate({value}) { onUpdateIndexPageSectionB(value); },
                compareValue: ClientUtils.compareJSON
            }}/>
        </FormGroup>
    </Container>
};

export default Page;