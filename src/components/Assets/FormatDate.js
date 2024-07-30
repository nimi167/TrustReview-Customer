import React from 'react'

export default function FormatDate({ date }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <span>{formatDate(date)}</span>
    );

}
