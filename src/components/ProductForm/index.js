import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useFormik} from "formik";
import {v4 as uuidv4} from "uuid";
import {UploadImage} from "../../queries/image";
import {AddCoffee} from "../../queries/coffee";

// Alert is the function which renders the Success or Failure of Admin functions
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// SubmitData takes the form-values, formats the data, and sends it to the API queries.
function SubmitData(values) {

    // Set a new unique image identifier
    const UUID = uuidv4();
    return UploadImage(values.productImage, UUID)
        .then(() => {

            const coffeeData = {
                name: values.productName ? values.productName : "",
                price: values.productPrice ? values.productPrice : "",
                image: "https://coffeemillandcakesstorage.s3.eu-west-2.amazonaws.com/"+UUID+".jpg",
                description: values.productDescription ? values.productDescription : "",
                visible: values.productVisible,
            }

            // Is the image has successfully been uploaded to S3 bucket, add the product description
            return AddCoffee(coffeeData)
        }).catch(() => {});
}

// ProductForm is the input form shown to admin users, which they can use to add data to the database
const ProductForm = (props) => {

    const [nameErr, setNameErr] = useState(false);
    const [priceErr, setPriceErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            productCategory: 'coffee',
            productName: '',
            productPrice: '',
            productDescription: '',
            productVisible: true,
            productImage: props.image,
        },

        onSubmit: values => {
            values.productImage = props.image;

            if (values.productName === '') {
                setNameErr(true);
            } else {
                setNameErr(false)
            }

            if (values.productPrice === '') {
                setPriceErr(true);
            } else {
                setPriceErr(false)
            }

            if (values.productDescription === '') {
                setDescriptionErr(true);
            } else {
                setDescriptionErr(false)
            }

            if (values.productImage === '') {
                setImageErr(true);
            } else {
                setImageErr(false);
            }

            // If no errors are present in the form, submit data
            if (!nameErr && !priceErr && !descriptionErr && !imageErr) {
                SubmitData(values)
                    .then(() => {
                        setSnackbarStatus("success");
                        setSnackbarMessage("Successfully Added Coffee!");
                        setSnackbarOpen(true);
                    }).catch((err) => {
                        setSnackbarStatus("error");
                        setSnackbarMessage(err.message);
                        setSnackbarOpen(true);
                    })
            }
        }
    });

    return (
        <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
            <TextField
                select
                id="productCategory"
                name="productCategory"
                label="Product Category"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.productCategory}
                fullWidth={true}
                style={{ margin: '10px 0 10px 0' }}
            >
                <MenuItem value={"coffee"} style={{ padding: 20 }}>Coffee</MenuItem>
                <MenuItem value={"treats"} style={{ padding: 20 }}>Treats</MenuItem>
                <MenuItem value={"cakes"} style={{ padding: 20 }}>Cakes</MenuItem>
            </TextField>

            <TextField
                id="productName"
                name="productName"
                label="Product Name"
                variant="outlined"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.productName}
                fullWidth={true}
                style={{ margin: '10px 0 10px 0' }}
                error={nameErr}
                helperText={nameErr ? "Product name must be present" : ''}
            />

            <TextField
                id="productPrice"
                name="productPrice"
                label="Product Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.productPrice}
                fullWidth={true}
                style={{ margin: '10px 0 10px 0' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
                error={priceErr}
                helperText={priceErr ? "Product price must be present" : ''}
            />

            <TextField
                id="productDescription"
                name="productDescription"
                label="Product Description"
                variant="outlined"
                type="text"
                multiline={true}
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.productDescription}
                fullWidth={true}
                style={{ margin: '10px 0 10px 0' }}
                error={descriptionErr}
                helperText={descriptionErr ? "Product description must be present" : ''}
            />

            <FormLabel
                style={{ width: '100%', marginTop: '20px' }}
                component="legend"
            >
                Show Product on Website?
            </FormLabel>
            <FormGroup >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.productVisible}
                            onChange={(e) => {
                                formik.setFieldValue('productVisible', e.target.checked)
                            }}
                        />
                    }
                    label="Product Visible"
                />

                <Button
                    style={{ margin: '40px 0' }}
                    fullWidth={true}
                    variant="outlined"
                    type="submit"
                >
                    Add Product
                </Button>
            </FormGroup>

            <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => { setSnackbarOpen(false) }}>
                <Alert onClose={() => { setSnackbarOpen(false) }} severity={snackbarStatus}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </form>
    );
}

export default (ProductForm);

ProductForm.propTypes = {
    image: PropTypes.string.isRequired,
};
