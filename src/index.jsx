import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { HelloWorld } from './app.tsx';

render(<HelloWorld />, document.getElementById('content'));