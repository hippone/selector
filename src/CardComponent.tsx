// CardComponent.tsx
import React from 'react';
import {Card} from './types';
import dayjs from 'dayjs';

interface CardProps {
    card: Card;
    onAction: (card: Card) => void;
    actionLabel: string;
}

const CardComponent: React.FC<CardProps> = ({card, onAction, actionLabel}) => {
    return (
        <li className={'selector-item-li'}>
            <div className={'selector-item-li__header'}>
                <div className={'title'}>
                    <h3>{card.title}</h3>
                </div>
                <button className={'btn'} onClick={() => onAction(card)}>{actionLabel}</button>
            </div>
            <div className={'text'}>
                <p>{card.content}</p>
            </div>
            <div className={'time'}>{dayjs.unix(card.date).format('YYYY-MM-DD')}</div>
            {card.isNew && <div className={'remark-new'}>new</div>}
        </li>
    );
};

export default CardComponent;
