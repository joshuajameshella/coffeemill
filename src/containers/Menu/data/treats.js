// This is a placeholder. Eventually, the data will be retrieved using API requests
// to the MongoDB API, which will store this data.

import BaciDiDama from '../../../images/treats/BaciDiDama.jpg';
import Blondies from '../../../images/treats/Blondies.jpg';
import Chokito from '../../../images/treats/Chokito.jpg'
import LemonTart from '../../../images/treats/LemonTart.jpg';
import Biscotti from '../../../images/treats/Biscotti.jpg';
import Friand from '../../../images/treats/Friand.jpg';
import HoneyTower from '../../../images/treats/HoneyTower.jpg';
import MillionaireShortbread from '../../../images/treats/MillionairesShortbread.jpg';
import OreoMillionaire from '../../../images/treats/OreoMillionaire.jpg';
import Unknown from '../../../images/treats/Unknown.png';

// Treats is the data used to render each menu item on the treats tab.
export const Treats = [
    {
        name: "Baci di Dama",
        price: "-",
        description: [
            "Baci di Dama are also known as lady's kisses. These Italian hazelnut cookies are sandwiched together with a chocolate ganache. The hazelnut cookie is buttery and very delicate. It has a melt in the mouth texture.",
        ],
        image: BaciDiDama,
    },
    {
        name: "Biscotti",
        price: "-",
        description: [
            "Biscotti di Prato is the full name as this biscuit/cookie originated in the Tuscan city of Prato. They are also often referred to as cantucci. The crunchy almond cookie get this hard and crunchy texture as they are twice baked. The cookie is often dipped in a drink, in Italy traditionally Vin Santo, in the UK, more traditionally coffee.",
        ],
        image: Biscotti,
    },
    {
        name: "Blondies",
        price: "-",
        description: [
            "This is a chewy, buttery and soft blondie, often referred to as a blonde brownie. It is a rich and sweet dessert bar and resembles the traditional chocolate brownie.\n" +
            "The flavours may change in my blondies, but the same delicious taste remains.",
            "Popular flavours of our blondies include;",
            "Raspberry & White Chocolate",
            "Raspberry Bakewell",
            "S'Mores",
            "White Chocolate & Macadamia Nut",
            "Peanut Butter & Pretzel",
            "Caramel & Chocolate Chunk"
        ],
        image: Blondies,
    },
    {
        name: "Honey Tower Cake",
        price: "-",
        description: [
            "The base layer of this light and airy treat is a honey flavoured cookie/sponge. It is then piped with a white chocolate cheesecake ganache then topped with fresh berries or chocolates.",
        ],
        image: HoneyTower,
    },
    {
        name: "Friands",
        price: "-",
        description: [
            "A Friand is a small almond cake popular in Australia and New Zealand, closely related to the French financier. In French, a Friand literally means 'a tasty thing'.",
            "I hope you think so too! I offer different flavours but by far the most popular are raspberry and almond or raspberry and pistachio.",
        ],
        image: Friand,
    },
    {
        name: "French Lemon Cream Tart",
        price: "-",
        description: [
            "A sweet shortcrust pastry tart filled with a sharp , silky citrus cream and topped with either fresh berries or pistachio nuts."
        ],
        image: LemonTart,
    },
    {
        name: "Chokito",
        price: "-",
        description: [
            "This recipe is a take on the Australian chocolate bar Chokito.",
            "It's a thick layer of chocolate coated Rice Krispies with a rich and sweet white chocolate fudge nestled in the middle. Extremely rich and sweet, definitely one for you if you have a sweet tooth!",
        ],
        image: Chokito,
    },
    {
        name: "Oreo Millionaire Shortbread",
        price: "-",
        description: [
            "This is a take on the traditional Millionaire Shortbread but has a rich dark Oreo base instead of the usual shortbread. It’s then topped with the same gooey caramel layer before getting to the topping of milk chocolate and an additional Oreo cookie on top.",
        ],
        image: OreoMillionaire,
    },
    {
        name: "Millionaire Shortbread",
        price: "-",
        description: [
            "A rich and crumbly shortbread base topped with a smooth caramel layer before crunching through a topping of milk chocolate.",
        ],
        image: MillionaireShortbread,
    },
    {
        name: "Frangipani Tart",
        price: "-",
        description: [
            "Frangipani is a sweet almond flavoured custard that I use to fill homemade , buttery, melt-in-the-mouth pastry cases. The custard covers fresh fruit, for example raspberries, blueberries, blackberries and then has a generous topping of flaked almonds on top before being baked.",
            "The frangipani has a light sweetness to it and a nutty flavour due to the almonds.",
        ],
        image: Unknown,
    },
    {
        name: "Double Chocolate Gooey Brownies",
        price: "-",
        description: [
            "Perfectly crisp and crackly top, super fudgy centre, chewy and gooey in all the right places, studded with melted chunks of chocolate.",
            "How do you like yours?",
        ],
        image: Unknown,
    }
];