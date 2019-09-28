import {configure,addDecorator} from '@storybook/react';
import {withInfo} from '@storybook/addon-info'

const req = require.context('../rtcjs', true, /.story.js$/);
addDecorator(withInfo)
function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);