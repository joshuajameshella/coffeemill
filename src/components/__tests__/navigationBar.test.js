import { unmountComponentAtNode } from "react-dom";
import NavigationBar from "../NavigationBar";
import { PAGES, SOCIAL_MEDIA } from '../NavigationBar/links';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import logo_full from '../../images/logo.png';
import logo_compressed from '../../images/logo_compressed.png';

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

describe("NavigationBar", () => {

    // Check that the component renders correctly
    it("correctly renders", () => {
        shallow(<NavigationBar isMobile={false}/>);
    });

    // If desktop display, the <nav> component should render in place of the <SlideInMenu>
    it("renders a desktop display, and it's components", () => {
        const wrapper = shallow(<NavigationBar isMobile={false}/>);
        expect(wrapper.find("nav").length).toEqual(1);
        expect(wrapper.find("img").length).toEqual(SOCIAL_MEDIA.length + 1);
        expect(wrapper.find("a").length).toEqual(PAGES.length + SOCIAL_MEDIA.length + 1);
        expect(wrapper.find("SlideInMenu").isEmptyRender()).toBe(true)
    });

    // If mobile display, the <SlideInMenu> should render in place of the <nav> component
    it("renders a mobile display, and it's components", () => {
        const wrapper = shallow(<NavigationBar isMobile={true}/>);
        expect(wrapper.find("SlideInMenu").length).toEqual(1);
        expect(wrapper.find("nav").isEmptyRender()).toBe(true)
    });

    // Check that the two different logo formats render, depending on the screen-width
    it("renders the correct image based on screen width", () => {
        let wrapper = shallow(<NavigationBar isMobile={false}/>);
        expect(wrapper.findWhere((img) => img.prop("alt") === "Coffee Mill & Cakes logo").prop("src")).toEqual(logo_compressed);

        wrapper = shallow(<NavigationBar isMobile={true}/>);
        expect(wrapper.findWhere((img) => img.prop("alt") === "Coffee Mill & Cakes logo").prop("src")).toEqual(logo_full);
    });

    // Check that the two different logo formats render, depending on the screen-width
    it("renders the correct social media links", () => {
        let wrapper = shallow(<NavigationBar isMobile={false}/>);
        SOCIAL_MEDIA.forEach((social) => {
            expect(wrapper.findWhere((img) => img.prop("src") === social.icon).prop("alt")).toEqual(social.description);
        });
    });
});