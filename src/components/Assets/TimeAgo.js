import React from 'react';
// it show time for rating in review card
const TimeAgo = ({ date }) => {
    const formatDate = (dateString) => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = now - date;

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;

        if (diff < hour) {
            return `${Math.round(diff / minute)} min ago`;
        } else if (diff < day) {
            return `${Math.round(diff / hour)} hour${Math.round(diff / hour) === 1 ? '' : 's'} ago`;
        } else if (diff < week) {
            return `${Math.round(diff / day)} day${Math.round(diff / day) === 1 ? '' : 's'} ago`;
        } else {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    };

    return (
        <span>{formatDate(date)}</span>
    );
};

export default TimeAgo;

// Usage example:
// <TimeAgo date="2024-04-22T11:54:08.646Z" />
