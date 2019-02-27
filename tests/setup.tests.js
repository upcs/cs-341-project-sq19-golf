import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill'; //Fixes some issues with webpack failing to load babel-polyfill for tests

configure({ adapter: new Adapter() });
