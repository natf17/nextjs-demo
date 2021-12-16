import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Events.stories'

import { useRouter } from 'next/router';

// Storybook composeStories() is not correctly setting the useRouter context
// useRouter() returns null, whereas inside Storybook, 
// it correctly returns the mock Router context that storybook-addon-next-router enables
// This causes an error when running this test, as the render() function cannot render the
// Event.tsx component, which attempts to destructure the useRouter() return object {locale}
// Mocking in Jest...
/*
--- Can also be mocked and spied like this:
    jest.spyOn(require('next/router'), 'useRouter')
        .mockImplementation(() => ({
          locale: 'en'
        })
    );
*/

jest.mock('next/router', () => ({
    __esModule: true,
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(() => ({locale: 'en'}))
  })
);

const { WithSeasonsAndEvents } = composeStories(stories);


describe('Events Screen', ()=> {
  render(<WithSeasonsAndEvents />);

  it('mocks useRouter and tracks calls to it', () => {

    expect(useRouter).toHaveBeenCalled();

  });


  it('renders input data', ()=> {
    
  });
});

describe('Events language picker', () => {  
  it('shows all event languages available', ()=> {
    
  });


  it('correctly filters displayed events based on language selection', ()=> {

  });

  
  it('does not render if no event languages exist', () => {

  });


  it('displays available language if only one event language is available', () => {

  });


  it('disables language selection if only one event language is available', () => {

  });
});