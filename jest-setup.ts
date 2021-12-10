// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom/extend-expect';
import { setGlobalConfig } from '@storybook/testing-react';

// Storybook's preview file location
import * as globalStorybookConfig from './.storybook/preview';

setGlobalConfig(globalStorybookConfig);