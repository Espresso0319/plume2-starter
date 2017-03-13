import * as React from 'react'
import { Relax } from 'plume2'
import { Card, CardTitle, CardText, } from 'react-toolbox'

type DetailType = {
  id: string,
  author?: {
    avatar_url: string,
    loginname: string,
  },
  author_id?: string,
  content?: string,
  create_at: string,
  good?: boolean,
  last_reply_at?: string,
  reply_count?: number,
  tab?: string,
  title?: string,
  top?: boolean,
  visit_count?: number,
  replies?: [{
    id: string,
    aauthor?: {
      avatar_url: string,
      loginname: string,
    },
    content?: string,
    ups: [string],
    create_at: string,
    reply_id: string,
  }],
}

interface IProps {
  relaxProps?: {
    detail: any
  }
}

@Relax
export default class Detail extends React.Component<IProps, any>
{
  static relaxProps = {
    detail: 'detail'
  };

  render() {
    let detail: DetailType = this.props.relaxProps.detail.toJS() as DetailType;
    return (
      <div>
        <Card>
          <CardTitle
            avatar={detail.author.avatar_url}
            title={detail.author.loginname}
          />
          <CardText>{detail.content}</CardText>
        </Card>
      </div >

    );
  }
}