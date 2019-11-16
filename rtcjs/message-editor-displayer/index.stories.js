import { h } from 'preact';
import { Button } from '<your-button>';

export default { title: 'Button' }

export const withText = () => (
  <Button>Hello Button</Button>
);

export const withEmoji = () => (
  <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
);