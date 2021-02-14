import flowers from "../../images/flowers.jpeg";
import coffee from "../../images/coffee.jpeg";
import window from "../../images/window.jpeg";

// ImageData is the information required to render the home-page images.
// It is arranged as an array within an array, in order to determine which images to place in each column.
export const ImageData = [
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
