import React from 'react'
import {describe, test as it, expect} from 'vitest'
import {render} from '@testing-library/react'
import App from '../App';
import {BrowserRouter} from 'react-router-dom'

describe('App Component', ()=> {
    it('Does not crash', async () => {
        render(<BrowserRouter><App /></BrowserRouter>);
        // TODO: Write the test!
        
    });
})