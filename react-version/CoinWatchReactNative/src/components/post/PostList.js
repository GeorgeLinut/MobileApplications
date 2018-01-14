import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { postFetch, postUpdate } from '../../actions/index';
import PostCard from './PostCard';
import _ from 'lodash';
class PostList extends Component {
    componentWillMount() {
        this.props.postFetch();
        this.createDataSource(this.props);
        console.log('componenet will mount', this.props.posts);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ posts }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(posts);
    }

    renderRow(post) {
        return (
            <PostCard post={post} />
        );
    }


    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    let posts = _.map(state.posts, (val, uid) => {
        return {...val, uid};
    });
    posts = posts.reverse();
    return {posts};
};

export default connect(mapStateToProps, { postFetch, postUpdate })(PostList);
