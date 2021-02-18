import flowers from "../../images/flowers.jpeg";
import coffee from "../../images/coffee.jpeg";
import window from "../../images/window.jpeg";

// ImageGridData is the information required to render the home-page images.
// It is arranged as an array within an array, in order to determine which images to place in each column.
export const ImageGridData = [
    [
        {
            image: window,
            description: "Front of shop window, showing logo & interior"
        }
    ],
    [
        {
            image: flowers,
            description: "Small arrangement of flowers on cafe table"
        },
        {
            image: coffee,
            description: "Two take-away coffee cups being prepared"
        }
    ]
];

// ImageLinkData is the information required to render the internal re-direct images on the home page.
// Each object contains an background image, text to be displayed, and a link.
export const ImageLinkData = [
    {
        image: flowers,
        mainText: "Order today",
        subText: "Place an order to be picked up in-store",
        linkText: "Order",
        link: "/contact",
    },
    {
        image: flowers,
        mainText: "Made from scratch",
        subText: "Take a look at our menu",
        linkText: "Menu",
        link: "/menu",
    },
];
