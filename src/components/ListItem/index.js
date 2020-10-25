import React from 'react'
import TimeAgo from 'react-timeago';
import { GoPlus } from 'react-icons/go';
import './listitem.scss';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
    const { id, title, by, time, url } = props.story;
    return (
        <div className="list__item">
            <a href={url} id="title" target="_blank" rel="noopener noreferrer">{title}</a>
            <div className="list__item--desc">
                <p>By:{' '}{by}</p>
                <p>{'|'}</p>
                <p><TimeAgo date={new Date(time * 1000).toISOString()} /></p>
            </div>
            <div className="list__item--detail">
                <Link to={`/story/detail/${id}`}>
                    <div className="plus-sign">
                        <GoPlus id="plus" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ListItem
