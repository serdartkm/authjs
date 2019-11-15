
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import '@testing-library/jest-dom/extend-expect'
Enzyme.configure({ adapter: new Adapter() });