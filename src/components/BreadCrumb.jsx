import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
    return (
        <div role="presentation" className="bread-crumb" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" href="/" className='bread-crumb-link'>
                    Home
                </Link>
                <Link
                    underline="hover"
                    href="/material-ui/getting-started/installation/"
                    className='bread-crumb-link'
                >
                    Stocks
                </Link>

                <Link
                    underline="hover"
                    href="/"
                    aria-current="page"
                    className='bread-crumb-link'
                >
                    StockName
                </Link>
            </Breadcrumbs>
        </div>
    );
}