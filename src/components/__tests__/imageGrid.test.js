import { unmountComponentAtNode } from "react-dom";
import ImageGrid from "../ImageGrid";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { ImageData } from '../../containers/Home/landingImages';

let container = null;

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

describe("ImageGrid", () => {

    // Check that the component renders correctly
    it("correctly renders", () => {
        shallow(<ImageGrid images={ImageData}/>);
    });

    // Check that each image is rendered, and has the correct attributes attached
    it("renders each image, with the expected attributes", () => {
        const wrapper = shallow(<ImageGrid images={ImageData}/>);
        ImageData.forEach((imageList) => {
           imageList.forEach((image) => {
               expect(wrapper.findWhere((img) => img.prop("src") === image.image).length).toEqual(1)
               expect(wrapper.findWhere((img) => img.prop("src") === image.image).prop("alt")).toEqual(image.description)
           });
        });
    });
});

