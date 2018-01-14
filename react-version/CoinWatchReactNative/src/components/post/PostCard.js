import React from 'react';
import { Container, Header, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

const PostCard = (props) => {
    const { email, date, message, likes, active } = props.post;
    return (
        <Card style={{flex: 0}}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg'}} />
                    <Body>
                    <Text>{email}</Text>
                    <Text note>{date}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                <Text>
                    {message}
                </Text>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>{likes} Likes</Text>
                    </Button>
                </Left>
            </CardItem>
        </Card>
    )
};


export default PostCard;
