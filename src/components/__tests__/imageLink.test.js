import { unmountComponentAtNode } from "react-dom";
import ImageLink from "../ImageLink";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { ImageLinkData } from '../../containers/Home/landingImages';

let container = null;
const exampleImageData = ImageLinkData[0];

configure({ adapter: new Adapter() });

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("ImageLink", () => {

    // Check that the component renders correctly
    it("correctly renders", () => {
        shallow(<ImageLink properties={exampleImageData}/>);
    });
});

